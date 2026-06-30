'use client';

import DOMPurify from 'dompurify';
import { siteFetch } from '@/lib/siteFetch';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Users,
  Download,
  Globe,
  Shield,
  Zap,
  BookOpen,
  Target,
  Clock,
  Search,
  CheckCircle2
} from 'lucide-react';
import DynamicSEO from '@/components/shared/DynamicSEO';
import { WebsiteSchema, OrganizationSchema } from '@/components/shared/SchemaMarkup';
import OurLeadership from '@/components/shared/OurLeadership';
import AnnouncementsDisplay from '@/components/shared/AnnouncementsDisplay';
import VisitorCounter from '@/components/shared/VisitorCounter';
import VisitorAnalytics from '@/components/shared/VisitorAnalytics';
import PublicationStatistics from '@/components/shared/PublicationStatistics';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import IssueDisplay, { IssueDisplayProps } from '@/components/shared/IssueDisplay';
import IndexingDatabases from '@/components/shared/IndexingDatabases';

interface LatestPaper {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  publishedAt: string;
  issuePublishDate?: string;
  downloads: number;
  category: string;
}

interface Stats {
  totalPapers: number;
  totalAuthors: number;
  totalDownloads: number;
  totalReviews: number;
}

export default function HomePage() {
  const [latestPapers, setLatestPapers] = useState<LatestPaper[]>([]);
  const [latestIssue, setLatestIssue] = useState<IssueDisplayProps | null>(null);
  const [upcomingIssue, setUpcomingIssue] = useState<IssueDisplayProps | null>(null);
  const [stats, setStats] = useState<Stats>({
    totalPapers: 0,
    totalAuthors: 0,
    totalDownloads: 0,
    totalReviews: 0
  });
  const [loading, setLoading] = useState(true);

  useVisitorTracking();

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const response = await siteFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home`);
      if (!response.ok) throw new Error('Failed to fetch home data');
      const data = await response.json();
      setStats(data.stats);
      setLatestPapers(data.latestPapers);
      setLatestIssue(data.latestIssue);
      setUpcomingIssue(data.upcomingIssue);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DynamicSEO
        title="EJIMAPSS - European Journal of Integrative Medicinal and Allied Paramedical Spectrum Studies"
        description="A peer-reviewed international journal dedicated to publishing rigorous research in integrative medicine and paramedical sciences."
        keywords={['integrative medicine', 'paramedical research', 'wellness', 'research journal', 'academic publishing', 'EJIMAPSS', 'peer review']}
        ogImage="https://ejimapss.com/og-image.jpg"
        canonicalUrl="https://ejimapss.com"
      />
      <WebsiteSchema
        name="EJIMAPSS"
        url="https://ejimapss.com"
        description="A peer-reviewed international journal dedicated to publishing rigorous research in integrative medicine and paramedical sciences."
        publisher="EJIMAPSS"
      />
      <OrganizationSchema
        name="EJIMAPSS"
        url="https://ejimapss.com"
        logo="https://ejimapss.com/ejimapss-logo.svg"
        description="EJIMAPSS - European Journal of Integrative Medicinal and Allied Paramedical Spectrum Studies"
        contactPoint={{
          email: "editor@ejimapss.com",
          contactType: "Editorial Office"
        }}
      />
      
      <div className="min-h-screen font-sans">
        
        {/* Hero Section */}
        <section className="relative border-b border-slate-200" style={{background: 'linear-gradient(135deg, #0d4a52 0%, #1d6a7a 100%)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase" style={{background: 'rgba(255,255,255,0.15)', color: '#7fdbea'}}>
                  ISSN: 3143-035X (Online)
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white">
                  European Journal of <br className="hidden md:block" />
                  <span style={{color: '#7fdbea'}}>Integrative Medicinal and<br className="hidden md:block" />Allied Paramedical Studies</span>
                </h1>

                <p className="text-xl max-w-2xl leading-relaxed" style={{color: '#c5e8f0'}}>
                  A peer-reviewed international journal dedicated to publishing rigorous research in integrative medicine and paramedical sciences globally.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link
                    href="/submit"
                    className="inline-flex items-center justify-center px-6 py-3 text-white rounded-md transition-colors font-medium text-lg shadow-sm"
                    style={{background: '#0f8fa3'}}
                    onMouseEnter={e => (e.currentTarget.style.background='#0d7a8c')}
                    onMouseLeave={e => (e.currentTarget.style.background='#0f8fa3')}
                  >
                    Submit Manuscript
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>

                  <Link
                    href="/library"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-md transition-colors font-medium text-lg"
                    style={{background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)'}}
                  >
                    Browse Library
                  </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 max-w-lg" style={{borderTop: '1px solid rgba(255,255,255,0.2)'}}>
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.totalPapers.toLocaleString()}+</div>
                    <div className="text-sm font-medium" style={{color: '#7fdbea'}}>Research Articles</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.totalAuthors.toLocaleString()}+</div>
                    <div className="text-sm font-medium" style={{color: '#7fdbea'}}>Global Contributors</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">16+</div>
                    <div className="text-sm font-medium" style={{color: '#7fdbea'}}>Indexed In</div>
                  </div>
                </div>
              </div>

              {/* Leadership/Board Preview */}
              <div className="lg:col-span-4">
                <div className="rounded-lg p-6 shadow-sm" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)'}}>
                  <h3 className="font-serif font-bold text-lg text-white mb-4 pb-2" style={{borderBottom: '1px solid rgba(255,255,255,0.2)'}}>Editorial Leadership</h3>
                  <OurLeadership />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Issues Section */}
        {(latestIssue || upcomingIssue) && (
          <section className="py-16 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900">Current Issue</h2>
                    <p className="text-slate-600 mt-2">Volume {latestIssue?.volume}, Issue {latestIssue?.issue} ({latestIssue?.year})</p>
                 </div>
                 <Link href="/issues" className="text-slate-900 hover:text-slate-700 font-medium inline-flex items-center">
                    View All Issues <ArrowRight className="w-4 h-4 ml-1" />
                 </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestIssue && (
                  <IssueDisplay
                    {...latestIssue}
                    isUpcoming={false}
                  />
                )}
                {upcomingIssue && (
                  <IssueDisplay
                    {...upcomingIssue}
                    isUpcoming={true}
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* Indexing Databases */}
        <div className="border-b border-slate-100 bg-slate-50/50">
           <IndexingDatabases />
        </div>

        {/* Latest Publications */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                 <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Latest Research</h2>
                 <p className="text-slate-600">Explore the most recent peer-reviewed articles.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href="/library"
                  className="inline-flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
                >
                  View Full Library
                </Link>
              </div>
            </div>
            
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-50 h-64 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : latestPapers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestPapers.map((paper) => (
                  <div key={paper.id} className="group bg-white rounded-lg p-6 border border-slate-200 hover:shadow-md transition-all duration-200" style={{borderTop: '3px solid #1a6b7a'}}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{background: '#e8f6f8', color: '#1a6b7a'}}>
                        {paper.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(paper.issuePublishDate || paper.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg mb-2 transition-colors line-clamp-2" style={{color: '#1a3a4a'}}>
                      <Link href={`/papers/${paper.id}`}>{paper.title}</Link>
                    </h3>

                    <div className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(paper.abstract || '') }} />

                    <div className="mb-4 text-xs text-slate-500">
                      <span className="font-semibold" style={{color: '#1a6b7a'}}>Authors:</span> {paper.authors.join(', ')}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center text-xs text-slate-500">
                        <Download className="w-3 h-3 mr-1" />
                        {paper.downloads}
                      </div>
                      <Link
                        href={`/papers/${paper.id}`}
                        className="font-medium text-sm flex items-center"
                        style={{color: '#e8622a'}}
                      >
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-900 mb-1">No Publications Yet</h3>
                <p className="text-slate-500">Check back soon for new research.</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 border-y border-slate-200" style={{background: '#f0faf9'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4" style={{color: '#0d4a52'}}>Journal Features</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We are committed to the highest standards of academic publishing in integrative and paramedical medicine.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Globe, title: 'Global Reach', desc: 'Connecting integrative medicine researchers from over 65 countries.' },
                { icon: Shield, title: 'Rigorous Peer Review', desc: 'Double-blind review process ensuring quality and objectivity in medical research.' },
                { icon: Zap, title: 'Rapid Publication', desc: 'Efficient processing with an average turnaround of 4-6 weeks.' },
                { icon: BookOpen, title: 'Open Access', desc: 'Free unrestricted access to all published integrative medicine research.' },
                { icon: Target, title: 'High Visibility', desc: 'Indexed in major medical and academic databases for maximum citation.' },
                { icon: CheckCircle2, title: 'Ethical Standards', desc: 'Strict adherence to COPE guidelines for publication ethics.' }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm" style={{border: '1px solid #c5e8f0', borderTop: '3px solid #0f8fa3'}}>
                  <feature.icon className="w-8 h-8 mb-4" style={{color: '#0d4a52'}} />
                  <h3 className="text-lg font-bold mb-2" style={{color: '#0d4a52'}}>{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Announcements */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-slate-900">Announcements</h2>
             </div>
             <AnnouncementsDisplay targetAudience="ALL" limit={3} showDismiss={false} />
          </div>
        </section>

        {/* Publication Stats */}
        <PublicationStatistics />

        {/* CTA */}
        <section className="py-16 text-white" style={{background: 'linear-gradient(135deg, #0d4a52 0%, #1d6a7a 100%)'}}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
              Submit Your Integrative Medicine Research Today
            </h2>
            <p className="mb-8 text-lg" style={{color: '#c5e8f0'}}>
              Join our community of integrative medicine scholars and contribute to advancing wellness globally.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/submit"
                className="inline-flex items-center justify-center px-8 py-3 text-white rounded-md transition-colors font-bold"
                style={{background: '#0f8fa3'}}
              >
                Start Submission
              </Link>
              <Link
                href="/submission-guidelines"
                className="inline-flex items-center justify-center px-8 py-3 text-white rounded-md transition-colors"
                style={{border: '1px solid rgba(255,255,255,0.4)'}}
              >
                Read Guidelines
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}


