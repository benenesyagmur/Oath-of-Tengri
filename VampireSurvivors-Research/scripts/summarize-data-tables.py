"""Derived research views. Does not read or alter gameplay save files."""
import json, hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'05-research-evidence/artifacts/unity-data'
inv=json.loads((DATA/'inventory.json').read_text(encoding='utf-8'))
families={'weapon':[], 'character':[], 'enemy':[], 'stage':[], 'item':[], 'achievement':[]}
views={'weapons':[], 'characters':[], 'evolutions':[]}
for f in inv['files']:
    for a in f['text_assets']:
        if 'parsed_evidence' not in a: continue
        p=DATA/a['parsed_evidence']
        assert hashlib.sha256(p.read_bytes()).hexdigest()==a['parsed_sha256']
        table=json.loads(p.read_text(encoding='utf-8'))
        name=a['name'].lower().replace('_','')
        for fam in families:
            if name.startswith(fam+'data'):
                families[fam].append({'asset':a['name'],'source':a['parsed_evidence'],'records':len(table), 'keys':list(table)})
        if name.startswith('weapondata'):
            for key,rows in table.items():
                base=rows[0] if isinstance(rows,list) and rows else rows
                if not isinstance(base,dict): continue
                record={'source':a['parsed_evidence'],'key':key,'rows':len(rows),
                        'base':{k:base[k] for k in ['name','hidden','isUnlocked','isPowerUp','isEvolution','rarity','price','interval','repeatInterval','power','area','speed','duration','amount','penetrating','poolLimit','critChance','critMul'] if k in base}}
                views['weapons'].append(record)
                ev={k:base[k] for k in ['evoInto','evoSynergy','evolvesFrom','requires','requiresMax','isEvolution'] if k in base}
                if ev: views['evolutions'].append({'source':a['parsed_evidence'],'key':key,**ev,
                    'row_triggers':[{'index':i, 'value':r['addEvolvedWeapon']} for i,r in enumerate(rows) if isinstance(r,dict) and 'addEvolvedWeapon' in r]})
        if name.startswith('characterdata'):
            for key,rows in table.items():
                base=rows[0] if isinstance(rows,list) and rows else rows
                if not isinstance(base,dict): continue
                views['characters'].append({'source':a['parsed_evidence'],'key':key,'rows':len(rows),
                    'base':{k:base[k] for k in ['charName','startingWeapon','maxHp','armor','moveSpeed','power','growth','cooldown','price','isBought','hidden'] if k in base},
                    'level_rows':rows[1:] if isinstance(rows,list) else []})
summary={'source_inventory_sha256':hashlib.sha256((DATA/'inventory.json').read_bytes()).hexdigest(),
         'input_files':len(inv['files']), 'text_assets':sum(len(f['text_assets']) for f in inv['files']),
         'parsed_tables':sum('parsed_evidence' in a for f in inv['files'] for a in f['text_assets']), 'families':{}}
for fam, tables in families.items():
    summary['families'][fam]={'tables':tables,'total_records_with_duplicates':sum(t['records'] for t in tables),
                              'unique_keys':len(set(k for t in tables for k in t['keys']))}
for kind,view in views.items():
    (DATA/(kind+'-derived-index.json')).write_text(json.dumps(view,ensure_ascii=False,indent=2),encoding='utf-8')
(DATA/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({**{k:v for k,v in summary.items() if k!='families'},'families':{k:{n:v for n,v in d.items() if n!='tables'} for k,d in summary['families'].items()}},indent=2))
