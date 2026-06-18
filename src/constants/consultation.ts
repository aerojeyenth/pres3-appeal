export const CONSULTATION_EMAIL = 'communications@mcirl.ie'
export const CONSULTATION_SUBJECT = 'Registration Public Consultation'
export const CONSULTATION_DEADLINE = '22 June 2026'
export const CONSULTATION_OFFICIAL_URL =
  'https://www.medicalcouncil.ie/news-and-publications/press-releases/press-release/items/medical-council-launches-public-consultation-on-proposed-amendment-to-its-registration-rules-to-recognise-plab-2-as-an-exam-alternative.html'
export const PDF_TEMPLATE_URL = `${import.meta.env.BASE_URL}original.pdf`
export const PDF_DOWNLOAD_FILENAME = 'registration-consultation-response.pdf'
export const PDF_SINGLE_LINE_FONT_SIZE = 11
export const PDF_MULTILINE_FONT_SIZE = 10

export const DEFAULT_INTEREST =
  'I am responding in support of internationally qualified medical graduates (IMGs) who wish to register with the Irish Medical Council and enter the Irish health workforce. Ireland faces a shortage of qualified doctors, and unnecessary delays in the registration process prevent skilled doctors from serving patients. I believe recognising PLAB 2 as equivalent to PRES 3 would help address this bottleneck while maintaining professional standards.'

export const PDF_FIELDS = {
  personalYes: '1.1 (a) y',
  personalNo: '1.1 (a) n',
  orgYes: '1.1 (b) y',
  orgNo: '1.1 (b) n',
  name: '1.2 name',
  organisation: '1.3 organisation',
  role: '1.4 role',
  interest: '1.5 interest',
  answer21: '2.1',
  answer22: '2.2',
} as const

export const DEFAULT_ANSWER_21 = `Yes. I believe the proposed exemption is justified and proportionate.

Ireland's health service is strained by a shortage of qualified doctors. Internationally qualified medical graduates are ready to contribute, but limited PRES 3 availability and long waiting times create an unnecessary bottleneck. The Medical Council has assessed PLAB 2 as equivalent in standards to PRES 3. Recognising PLAB 2 as an alternative provides a fair, evidence-based route to Irish Medical Council registration without lowering professional standards, while helping qualified doctors enter the workforce and start serving patients sooner.`

export const DEFAULT_ANSWER_22 = `I strongly support recognising PLAB 1 and PLAB 2 as equivalent to PRES 2 and PRES 3 respectively.

This change would help international medical graduates who have already demonstrated their clinical competence through the GMC's established PLAB pathway to register with the Irish Medical Council and begin practising in Ireland. It addresses a real and pressing bottleneck in the registration process, reduces unnecessary duplication of assessments, and aligns with existing administrative practice for PLAB 1. The result should be more doctors available to serve communities across Ireland, while maintaining appropriate professional standards.`

function buildEmailBody(name: string): string {
  return `Dear Medical Council,

Please find attached my response to the public consultation on the proposed Registration Rules amendment regarding PLAB/PRES equivalence.

I support recognising PLAB 2 as an equivalent route to PRES 3 so that internationally qualified medical graduates can register and contribute to the Irish health service without unnecessary delay.

Kind regards,
${name}`
}

export function buildEmailDraft(name: string): string {
  return `To: ${CONSULTATION_EMAIL}
Subject: ${CONSULTATION_SUBJECT}

${buildEmailBody(name)}`
}

export function buildMailtoLink(name: string): string {
  const params = new URLSearchParams({
    subject: CONSULTATION_SUBJECT,
    body: buildEmailBody(name),
  })

  return `mailto:${CONSULTATION_EMAIL}?${params.toString()}`
}

export function buildGmailComposeLink(name: string): string {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: CONSULTATION_EMAIL,
    su: CONSULTATION_SUBJECT,
    body: buildEmailBody(name),
  })

  return `https://mail.google.com/mail/?${params.toString()}`
}

export function buildOutlookComposeLink(name: string): string {
  const params = new URLSearchParams({
    to: CONSULTATION_EMAIL,
    subject: CONSULTATION_SUBJECT,
    body: buildEmailBody(name),
  })

  return `https://outlook.live.com/mail/deeplink/compose?${params.toString()}`
}
