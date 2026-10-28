import json,re,csv,collections,sys
R=sys.argv[1]
Q=json.load(open('qac_lemmas.json')); toks=json.load(open('tokens158.json')); T=json.load(open('verse_translations.json'))
A=json.load(open('appendix.json'))
TR=['SI','PI','YA','AR','HK']
# --- manual coding: taqwa (17) ---
taq={
'2:197':['fear (of Allah)','ward off evil','right conduct','godfearing','At-Taqwa (piety, righteousness, etc.)'],
'2:237':['righteousness','piety','righteousness','godfearing','At-Taqwa (piety, right-eousness, etc.)'],
'5:2':['piety','pious duty','piety','godfearing','At-Taqwa (virtue, righteousness and piety)'],
'5:8':['righteousness','(your) duty','piety','godfearing','piety'],
'7:26':['righteousness','restraint from evil','righteousness','godfearing','righteousness'],
'9:108':['righteousness','duty (to Allah)','piety','godfearing','piety'],
'9:109':['righteousness [with fear]','duty to Allah','piety','the fear of God','piety'],
'20:132':['[those of] righteousness','righteousness','righteousness','godfearing','the Muttaqun (pious)'],
'22:32':['piety','devotion','piety','godliness','piety'],
'22:37':['piety','devotion','piety','godliness','piety'],
'47:17':['righteousness','protection (against evil)','Piety and Restraint','godfearing','piety'],
'48:26':['righteousness','self-restraint','self-restraint','godfearing','piety'],
'49:3':['righteousness','righteousness','piety','godfearing','piety'],
'58:9':['piety','piety','self-restraint','godfearing','Taqwa (virtues and piety)'],
'74:56':['fear','fear','Righteousness','to be feared','paraphrase: deserving that mankind should be afraid of'],
'91:8':['righteousness','(what is) right','right','godfearing','(what is) right'],
'96:12':['righteousness','piety','Righteousness','godfearing','piety'],
}
def fam_taq(s):
    s=s.lower()
    if 'taqwa' in s or 'muttaqun' in s: return 'retention+gloss'
    if s.startswith('righteousness') or s.startswith('[those of] righteousness'): return 'righteousness/right'
    if 'piety' in s or 'devotion' in s or 'godliness' in s: return 'piety/devotion'
    if 'fear' in s or 'afraid' in s: return 'fear'
    if 'restraint' in s or 'ward off' in s or 'protection' in s: return 'restraint/protection'
    if 'duty' in s: return 'duty'
    if 'right' in s: return 'righteousness/right'
    return 'other'
# --- manual coding: kafir (27 tokens, keyed by token loc) ---
kaf={
'2:41:10':['verb: disbelieve','verb: disbelieve','verb: reject Faith','verb: disbelieve','verb: disbelieve'],
'2:109:11':['abstract: disbelief','disbelievers','abstract: infidelity','unbelievers','disbelievers'],
'2:161:6':['disbelievers','disbelievers','verb: die rejecting','verb: die disbelieving','disbelievers'],
'2:217:45':['a disbeliever','abstract: his disbelief','abstract: unbelief','verb: dies disbelieving','a disbeliever'],
'3:91:6':['disbelievers','abstract: in disbelief','verb: die rejecting','verb: die disbelieving','disbelievers'],
'4:18:19':['disbelievers','disbelievers','verb: die rejecting Faith','verb: die disbelieving','disbelievers'],
'5:57:17':['the disbelievers','the disbelievers','verb: those who reject Faith','the unbelievers','the disbelievers'],
'9:68:5':['the disbelievers','the disbelievers','the rejecters of Faith','the unbelievers','the disbelievers'],
'9:73:4':['the disbelievers','the disbelievers','the unbelievers','the unbelievers','the disbelievers'],
'9:120:35':['the disbelievers','the disbelievers','the Unbelievers','the unbelievers','disbelievers'],
'9:123:8':['the disbelievers','the disbelievers','the unbelievers','the unbelievers','the disbelievers'],
'13:42:15':['the disbelievers','the disbelievers','the Unbelievers','the unbelievers','the disbelievers'],
'25:55:11':['the disbeliever','the disbeliever','the Misbeliever','the unbeliever','the disbeliever'],
'47:34:11':['disbelievers','disbelievers','verb: die rejecting Allah','verb: die disbelieving','disbelievers'],
'48:29:8':['the disbelievers','the disbelievers','Unbelievers','the unbelievers','disbelievers'],
'48:29:44':['the disbelievers','the disbelievers','the Unbelievers','the unbelievers','the disbelievers'],
'54:43:1':['your disbelievers','your disbelievers','your Unbelievers','your unbelievers','your disbelievers'],
'57:20:17':['agricultural: the tillers','agricultural: the husbandman','agricultural: the tillers','the unbelievers','agricultural: the tiller'],
'60:10:18':['the disbelievers','the disbelievers','the Unbelievers','the unbelievers','the disbelievers'],
'60:11:7':['the disbelievers','the disbelievers','the Unbelievers','the unbelievers','the disbelievers'],
'60:13:16':['the disbelievers','the disbelievers','the Unbelievers','the unbelievers','the disbelievers'],
'64:2:5':['the disbeliever','a disbeliever','Unbelievers','an unbeliever','disbelievers'],
'66:9:4':['the disbelievers','the disbelievers','the Unbelievers','the unbelievers','the disbelievers'],
'78:40:12':['the disbeliever','the disbeliever','the Unbeliever','the unbeliever','the disbeliever'],
'80:42:3':['the disbelievers','the disbelievers','the Rejecters of Allah','the unbelievers','retention: Kafarah (disbelievers in Allah ...)'],
'83:34:5':['the disbelievers','disbelievers','the Unbelievers','the unbelievers','the disbelievers'],
'83:36:3':['the disbelievers','the disbelievers','the Unbelievers','the unbelievers','the disbelievers'],
}
def fam_kaf(s):
    s=s.lower()
    if s.startswith('verb'): return 'verbal'
    if s.startswith('abstract'): return 'abstract noun'
    if s.startswith('agricultural'): return 'agricultural'
    if s.startswith('retention'): return 'retention+gloss'
    if 'unbeliev' in s or 'misbeliev' in s or 'rejecter' in s: return 'agentive noun (unbeliever/rejecter)'
    if 'disbeliev' in s: return 'agentive noun (disbeliever)'
    return 'other'
# raḥmat exceptions found by verse-level check + manual reading
rah_ex={('17:24','YA'):'kindness ("out of kindness")',('27:19','PI'):'zero rendering (omitted)',('2:218','AR'):'compassion',('6:133','AR'):'Merciful (adjectival)'}
for v in ['11:58','11:66','11:73','21:84','27:19','38:43','39:38']: rah_ex[(v,'YA')]='Grace'
def fam_rah(s):
    s=s.lower()
    if 'grace' in s: return 'grace'
    if 'kindness' in s: return 'kindness'
    if 'compassion' in s: return 'compassion'
    if 'zero' in s: return 'zero'
    return 'mercy'
# thesis appendix coding
app={'taqwa':[r for r in A if r['table']==6],'kafir':[r for r in A if r['table']==11],'rahmat':[r for r in A if r['table'] in (7,8,9,10)]}
order={'taqwa':[t for t in toks if t['term']=='taqwa'],'kafir':[t for t in toks if t['term']=='kafir'],'rahmat':[t for t in toks if t['term']=='rahmat']}
rows=[]
for term in ['taqwa','rahmat','kafir']:
    tl=order[term]; al=app[term]
    assert len(tl)==len(al)
    modal=collections.Counter()
    for t in tl:
        g=t['gloss'].lower()
        modal['righteous' if 'righteous' in g else 'piety' if 'piety' in g else 'mercy' if 'mercy' in g else 'disbeliever' if 'disbeliev' in g else g]+=1
    default=modal.most_common(1)[0][0]
    for t,a in zip(tl,al):
        v=':'.join(t['loc'].split(':')[:2]); g=t['gloss']
        head='righteous' if 'righteous' in g.lower() else 'piety' if 'piety' in g.lower() else 'mercy' if 'mercy' in g.lower() else 'disbeliever' if 'disbeliev' in g.lower() else g
        thesis=re.sub(r'\s+',' ',a['eq']).strip()
        tcode='dynamic' if re.match(r'(?i)padanan dinamis',thesis) else 'formal'
        r=dict(token_id=t['loc'],surah=v.split(':')[0],ayah=v.split(':')[1],word=t['loc'].split(':')[2],term=term,qac_translit=t['translit'],qac_gloss=g,
               thesis_row=a['no'],thesis_label=a['ref'].replace('\n',' ').split('  ')[0][-40:] if False else '',thesis_code=tcode,
               revised_gloss_code='default' if head==default else 'variant')
        for i,n in enumerate(TR):
            if term=='taqwa': s=taq[v][i]; r[n]=s; r[n+'_family']=fam_taq(s)
            elif term=='kafir': s=kaf[t['loc']][i]; r[n]=s; r[n+'_family']=fam_kaf(s)
            else:
                s=rah_ex.get((v,n),'mercy (count-screened; flagged cells read manually)'); r[n]=s; r[n+'_family']=fam_rah(s)
        rows.append(r)
cols=['token_id','surah','ayah','word','term','qac_translit','qac_gloss','thesis_row','thesis_code','revised_gloss_code']+[x for n in TR for x in (n,n+'_family')]
with open(f'{R}/data/token_coding_158.csv','w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=cols,extrasaction='ignore'); w.writeheader(); w.writerows(rows)
# summaries
summ={}
for term in ['taqwa','rahmat','kafir']:
    rs=[r for r in rows if r['term']==term]
    summ[term]={'n':len(rs),'thesis_formal':sum(r['thesis_code']=='formal' for r in rs),'revised_default':sum(r['revised_gloss_code']=='default' for r in rs),
      'families':{n:dict(collections.Counter(r[n+'_family'] for r in rs)) for n in TR},
      'gloss_variants':sorted({r['qac_gloss'] for r in rs if r['revised_gloss_code']=='variant'})}
# participle extension
ext=[]
for idx in (12,13,11):
    for r in Q[idx]['rows']: ext.append(dict(token_id=r['loc'],lemma=Q[idx]['head']+' '+Q[idx]['rows'][0]['translit'],qac_translit=r['translit'],qac_gloss=r['gloss'],default='disbeliev' in r['gloss'].lower()))
with open(f'{R}/data/kafir_extension_131.csv','w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=['token_id','lemma','qac_translit','qac_gloss','default']); w.writeheader(); w.writerows(ext)
summ['kafir_extension']={'n':len(ext),'default':sum(e['default'] for e in ext),'variants':[(e['token_id'],e['qac_gloss']) for e in ext if not e['default']]}
json.dump(summ,open(f'{R}/data/coding_summary.json','w'),ensure_ascii=False,indent=1)
print(json.dumps(summ,ensure_ascii=False,indent=1))
