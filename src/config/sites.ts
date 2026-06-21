export interface SiteConfig {
  slug: string;
  domain: string;
  name: string;
  shortName: string;
  description: string;
  dbEnvVar: string;
  smtpUserEnvVar: string;
  smtpPassEnvVar: string;
  smtpFromEnvVar: string;
  r2BucketEnvVar: string;
  r2PublicUrlEnvVar: string;
  nextauthSecretEnvVar: string;
}

const sites: Record<string, SiteConfig> = {
  ejimapss: {
    slug: 'ejimapss',
    domain: 'ejimapss.com',
    name: 'European Journal of Integrative Medicinal and Allied Paramedical Spectrum Studies',
    shortName: 'EJIMAPSS',
    description: 'Integrative Medicinal and Allied Paramedical Research',
    dbEnvVar: 'DATABASE_URL_EJIMAPSS',
    smtpUserEnvVar: 'SMTP_USER_EJIMAPSS',
    smtpPassEnvVar: 'SMTP_PASS_EJIMAPSS',
    smtpFromEnvVar: 'SMTP_FROM_EJIMAPSS',
    r2BucketEnvVar: 'R2_BUCKET_EJIMAPSS',
    r2PublicUrlEnvVar: 'R2_PUBLIC_URL_EJIMAPSS',
    nextauthSecretEnvVar: 'NEXTAUTH_SECRET_EJIMAPSS',
  },
};

const DEV_SITE_SLUG = 'ejimapss';

export function getSiteConfig(slug: string): SiteConfig | null {
  return sites[slug] ?? null;
}

export function getSiteConfigByDomain(host: string): SiteConfig | null {
  const domain = host.split(':')[0];

  for (const site of Object.values(sites)) {
    if (site.domain === domain) return site;
  }

  if (domain === 'localhost' || domain === '127.0.0.1') {
    return sites[DEV_SITE_SLUG];
  }

  return null;
}

export function getAllSites(): SiteConfig[] {
  return Object.values(sites);
}
