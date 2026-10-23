"""Read-only Unity TextAsset inventory and JSON evidence extraction.
Never saves a Unity asset; output is confined to this research archive.
"""
import sys, json, hashlib, datetime, collections
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tools/python'))
import UnityPy
import json5

GAME = Path(r'B:\Steam\steamapps\common\Vampire Survivors\VampireSurvivors_Data')
OUT = ROOT / '05-research-evidence/artifacts/unity-data'
OUT.mkdir(parents=True, exist_ok=True)
inputs = [GAME/'resources.assets', GAME/'globalgamemanagers.assets']
inputs += sorted(GAME.glob('sharedassets*.assets'))
inputs += sorted((GAME/'StreamingAssets/aa/StandaloneWindows64').glob('*persistent*.bundle'))
report = {'method':'UnityPy read-only TextAsset decoding; JSON tables only; no texture/audio extraction',
          'created_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),
          'parser_version':UnityPy.__version__, 'json5_version':json5.__version__, 'files':[]}
for path in inputs:
    if not path.is_file():
        continue
    entry = {'path':str(path), 'size':path.stat().st_size,
             'sha256':hashlib.sha256(path.read_bytes()).hexdigest(), 'text_assets':[]}
    try:
        env = UnityPy.load(str(path))
        entry['object_types'] = dict(collections.Counter(o.type.name for o in env.objects))
        entry['serialized_files'] = [{'name':f.name,'unity_version':getattr(f,'unity_version',None)} for f in env.assets]
        for obj in env.objects:
            if obj.type.name != 'TextAsset':
                continue
            data = obj.read()
            raw = data.m_Script
            if isinstance(raw,str):
                raw = raw.encode('utf-8', errors='surrogateescape')
            asset = {'name':data.m_Name, 'path_id':obj.path_id, 'serialized_file':obj.assets_file.name,
                     'byte_length':len(raw), 'sha256':hashlib.sha256(raw).hexdigest()}
            try:
                try:
                    table = json.loads(raw)
                    asset['json_parser'] = 'stdlib-json'
                except (ValueError, UnicodeError) as strict_error:
                    asset['strict_json_error'] = str(strict_error)[:180]
                    table = json5.loads(raw.decode('utf-8-sig'), allow_duplicate_keys=False)
                    asset['json_parser'] = 'json5 (comments/trailing syntax allowed; duplicate keys rejected)'
                asset['json_type'] = type(table).__name__
                asset['top_level_count'] = len(table) if isinstance(table,(list,dict)) else None
                # Write parsed evidence, not a game-ready asset or artwork.
                safe = ''.join(c if c.isalnum() or c in '-_.' else '_' for c in data.m_Name)
                dest = OUT / (path.stem + '__' + str(obj.path_id) + '__' + safe + '.json')
                dest.write_text(json.dumps(table, ensure_ascii=False, indent=2), encoding='utf-8')
                asset['parsed_evidence'] = dest.name
                asset['parsed_sha256'] = hashlib.sha256(dest.read_bytes()).hexdigest()
            except (ValueError, UnicodeError) as exc:
                asset['json_error'] = str(exc)[:180]
            entry['text_assets'].append(asset)
    except Exception as exc:
        entry['error'] = type(exc).__name__ + ': ' + str(exc)[:400]
    report['files'].append(entry)
    (OUT/'inventory.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'file':path.name,'text_assets':len(entry['text_assets']),
                      'json_tables':sum('parsed_evidence' in a for a in entry['text_assets']),
                      'error':entry.get('error')},ensure_ascii=False),flush=True)
