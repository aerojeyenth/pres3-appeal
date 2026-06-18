import { PDFDocument, StandardFonts } from 'pdf-lib'
import {
  PDF_FIELDS,
  PDF_MULTILINE_FONT_SIZE,
  PDF_SINGLE_LINE_FONT_SIZE,
  PDF_TEMPLATE_URL,
} from '../constants/consultation'

export type ConsultationFormData = {
  name: string
  interest: string
  isOrganisation: boolean
  organisation: string
  role: string
  answer21: string
  answer22: string
}

function setCheckbox(form: ReturnType<PDFDocument['getForm']>, name: string, checked: boolean): void {
  try {
    const field = form.getCheckBox(name)
    if (checked) {
      field.check()
    } else {
      field.uncheck()
    }
  } catch {
    // Ignore missing or incompatible checkbox widgets.
  }
}

function setText(
  form: ReturnType<PDFDocument['getForm']>,
  name: string,
  value: string,
  fontSize: number,
): void {
  try {
    const field = form.getTextField(name)
    field.setFontSize(fontSize)
    field.setText(value)
  } catch {
    // Ignore missing text fields.
  }
}

export async function fillConsultationPdf(data: ConsultationFormData): Promise<Uint8Array> {
  const response = await fetch(PDF_TEMPLATE_URL)
  if (!response.ok) {
    throw new Error(
      `Could not load the consultation form template (${response.status} ${response.statusText}).`,
    )
  }

  const templateBytes = await response.arrayBuffer()
  const pdfDoc = await PDFDocument.load(templateBytes)
  const form = pdfDoc.getForm()

  setText(form, PDF_FIELDS.name, data.name, PDF_SINGLE_LINE_FONT_SIZE)
  setText(form, PDF_FIELDS.interest, data.interest, PDF_SINGLE_LINE_FONT_SIZE)
  setText(form, PDF_FIELDS.answer21, data.answer21, PDF_MULTILINE_FONT_SIZE)
  setText(form, PDF_FIELDS.answer22, data.answer22, PDF_MULTILINE_FONT_SIZE)

  if (data.isOrganisation) {
    setText(form, PDF_FIELDS.organisation, data.organisation, PDF_SINGLE_LINE_FONT_SIZE)
    setText(form, PDF_FIELDS.role, data.role, PDF_SINGLE_LINE_FONT_SIZE)
    setCheckbox(form, PDF_FIELDS.personalYes, false)
    setCheckbox(form, PDF_FIELDS.personalNo, false)
    setCheckbox(form, PDF_FIELDS.orgYes, true)
    setCheckbox(form, PDF_FIELDS.orgNo, false)
  } else {
    setText(form, PDF_FIELDS.organisation, '', PDF_SINGLE_LINE_FONT_SIZE)
    setText(form, PDF_FIELDS.role, '', PDF_SINGLE_LINE_FONT_SIZE)
    setCheckbox(form, PDF_FIELDS.personalYes, true)
    setCheckbox(form, PDF_FIELDS.personalNo, false)
    setCheckbox(form, PDF_FIELDS.orgYes, false)
    setCheckbox(form, PDF_FIELDS.orgNo, false)
  }

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  form.updateFieldAppearances(font)

  return pdfDoc.save()
}
