import {Fragment} from 'react';
import {Link,useParams} from 'react-router-dom';
import PartnerShell from '../components/wirrox/PartnerShell';
import PageNotFound from '../lib/PageNotFound';
import notices from '../legal/partner-notices.json';

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/gu).map((part,index)=>{
    if(part.startsWith('**'))return <strong key={index}>{part.slice(2,-2)}</strong>;
    const link=/^\[([^\]]+)\]\(([^)]+)\)$/u.exec(part);
    if(link && /^(https:\/\/|mailto:|\/partners\/)/u.test(link[2]))return <a key={index} className="underline text-bronze" href={link[2]}>{link[1]}</a>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

function paragraphs(text) {
  return text.trim().split(/\n\s*\n/u).map((block,index)=>{
    const lines=block.trim().split('\n');
    if(lines[0].startsWith('|')){
      const rows=lines.filter(line=>line.startsWith('|')&&!/^\|[\s:|\-]+\|$/u.test(line)).map(line=>line.slice(1,-1).split('|').map(value=>value.trim()));
      return <div key={index} className="overflow-x-auto my-6"><table className="w-full text-sm border-collapse"><thead><tr>{rows[0].map((cell,i)=><th key={i} className="text-left align-top p-3 border-b border-rule">{inline(cell)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j} className="align-top p-3 border-b border-rule">{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
    }
    if(/^#{2,3} /u.test(lines[0]))return <section key={index} className="mt-9"><h2 className="text-xl font-semibold mb-4">{inline(lines[0].replace(/^#+ /u,''))}</h2>{lines.length>1&&<p className="leading-relaxed">{inline(lines.slice(1).join(' '))}</p>}</section>;
    if(lines[0].startsWith('- '))return <ul key={index} className="list-disc pl-6 space-y-3 my-5">{block.split(/\n(?=- )/u).map((item,i)=><li key={i}>{inline(item.replace(/^- /u,'').replaceAll('\n',' '))}</li>)}</ul>;
    return <p key={index} className="leading-relaxed my-5">{inline(lines.join(' '))}</p>;
  });
}

export default function PartnerDocument(){
  const {document}=useParams();
  const data=notices.documents[document];
  if(!data)return <PageNotFound />;
  return <PartnerShell><article className="max-w-4xl mx-auto px-6 lg:px-10 pb-14 text-sm sm:text-base">
    <Link to="/partners" className="text-bronze underline">Partner Programme</Link>
    <h1 className="text-3xl sm:text-4xl font-semibold mt-6 mb-8">{data.title}</h1>
    {!notices.approved&&<p role="status" className="border border-rule rounded-md bg-card p-4 mb-6 text-sm">Publication review copy. These documents have not been activated. Prepared 6 November 2026.</p>}
    <nav aria-label="Partner information" className="flex flex-wrap gap-4 text-sm border-y border-rule py-4 mb-8">{Object.entries(notices.documents).map(([key,value])=><Link key={key} to={'/partners/'+key} className="underline text-bronze" aria-current={key===document?'page':undefined}>{value.title}</Link>)}</nav>
    {paragraphs(data.text)}
  </article></PartnerShell>;
}
