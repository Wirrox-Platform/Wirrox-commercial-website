import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/wirrox/Navbar';
import Footer from '../components/wirrox/Footer';
import { websiteNotices as legalDocuments } from '../legal/website-notices';
import PageNotFound from '../lib/PageNotFound';

export default function Legal() {
  const { slug } = useParams();
  const doc = legalDocuments.find(d => d.slug === slug);
  useEffect(() => { document.title = `${doc?.title || (slug ? 'Page not found' : 'Website information')} | WIRROX`; }, [doc, slug]);
  if (slug && !doc) return <PageNotFound />;
  return <div className="min-h-screen bg-canvas text-ink">
    <Navbar />
    <main className="max-w-4xl mx-auto px-6 pt-36 pb-24">
      {!slug ? <>
        <h1 className="text-4xl font-semibold mb-6">Website information</h1>
        <p className="mb-8">Company details and information about this website. Customer agreements are handled separately.</p>
        <ul className="space-y-4">{legalDocuments.map(d => <li key={d.slug}>
          <Link className="underline" to={`/legal/${d.slug}`}>{d.title}</Link>
        </li>)}</ul>
      </> : doc ? <>
        <Link className="underline" to="/legal">All website information</Link>
        <article className="legal-content mt-8">
          <h1>{doc.title}</h1>
          {doc.sections.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}</section>)}
        </article>
      </> : <><h1 className="text-3xl mb-6">Document not found</h1><Link to="/legal" className="underline">View legal documents</Link></>}
    </main>
    <Footer />
  </div>;
}
