'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

// ── Auth guard ──
async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  return session
}

// ── Generic helpers ──

async function createRecord(model, data, revalidate) {
  await requireAuth()
  const record = await prisma[model].create({ data })
  revalidatePath(revalidate)
  return record
}

async function updateRecord(model, id, data, revalidate) {
  await requireAuth()
  const record = await prisma[model].update({ where: { id }, data })
  revalidatePath(revalidate)
  return record
}

async function deleteRecord(model, id, revalidate) {
  await requireAuth()
  await prisma[model].delete({ where: { id } })
  revalidatePath(revalidate)
}

// ── Fee Structure ──
export async function createFeeGroup(data) {
  return createRecord('feeGroup', data, '/dashboard/fee-structure')
}
export async function updateFeeGroup(id, data) {
  return updateRecord('feeGroup', id, data, '/dashboard/fee-structure')
}
export async function deleteFeeGroup(id) {
  return deleteRecord('feeGroup', id, '/dashboard/fee-structure')
}
export async function createFeeNote(data) {
  return createRecord('feeNote', data, '/dashboard/fee-structure')
}
export async function updateFeeNote(id, data) {
  return updateRecord('feeNote', id, data, '/dashboard/fee-structure')
}
export async function deleteFeeNote(id) {
  return deleteRecord('feeNote', id, '/dashboard/fee-structure')
}

// ── Faculty ──
export async function createFaculty(data) {
  return createRecord('faculty', data, '/dashboard/faculty')
}
export async function updateFaculty(id, data) {
  return updateRecord('faculty', id, data, '/dashboard/faculty')
}
export async function deleteFaculty(id) {
  return deleteRecord('faculty', id, '/dashboard/faculty')
}

// ── Testimonials ──
export async function createTestimonial(data) {
  return createRecord('testimonial', data, '/dashboard/testimonials')
}
export async function updateTestimonial(id, data) {
  return updateRecord('testimonial', id, data, '/dashboard/testimonials')
}
export async function deleteTestimonial(id) {
  return deleteRecord('testimonial', id, '/dashboard/testimonials')
}

// ── Careers ──
export async function createCareer(data) {
  return createRecord('career', data, '/dashboard/careers')
}
export async function updateCareer(id, data) {
  return updateRecord('career', id, data, '/dashboard/careers')
}
export async function deleteCareer(id) {
  return deleteRecord('career', id, '/dashboard/careers')
}

// ── Circulars ──
export async function createCircular(data) {
  return createRecord('circular', { ...data, date: new Date(data.date) }, '/dashboard/circulars')
}
export async function updateCircular(id, data) {
  return updateRecord('circular', id, { ...data, date: new Date(data.date) }, '/dashboard/circulars')
}
export async function deleteCircular(id) {
  return deleteRecord('circular', id, '/dashboard/circulars')
}

// ── Homework ──
export async function createHomework(data) {
  return createRecord('homework', data, '/dashboard/homework')
}
export async function updateHomework(id, data) {
  return updateRecord('homework', id, data, '/dashboard/homework')
}
export async function deleteHomework(id) {
  return deleteRecord('homework', id, '/dashboard/homework')
}

// ── Book List ──
export async function createBookList(data) {
  return createRecord('bookList', data, '/dashboard/book-list')
}
export async function updateBookList(id, data) {
  return updateRecord('bookList', id, data, '/dashboard/book-list')
}
export async function deleteBookList(id) {
  return deleteRecord('bookList', id, '/dashboard/book-list')
}

// ── Syllabus ──
export async function createSyllabus(data) {
  return createRecord('syllabus', data, '/dashboard/examination')
}
export async function updateSyllabus(id, data) {
  return updateRecord('syllabus', id, data, '/dashboard/examination')
}
export async function deleteSyllabus(id) {
  return deleteRecord('syllabus', id, '/dashboard/examination')
}

// ── Datesheet ──
export async function createDatesheet(data) {
  return createRecord('datesheet', data, '/dashboard/examination')
}
export async function updateDatesheet(id, data) {
  return updateRecord('datesheet', id, data, '/dashboard/examination')
}
export async function deleteDatesheet(id) {
  return deleteRecord('datesheet', id, '/dashboard/examination')
}

// ── Calendar ──
export async function createCalendarEvent(data) {
  return createRecord('calendarEvent', { ...data, date: new Date(data.date) }, '/dashboard/calendar')
}
export async function updateCalendarEvent(id, data) {
  return updateRecord('calendarEvent', id, { ...data, date: new Date(data.date) }, '/dashboard/calendar')
}
export async function deleteCalendarEvent(id) {
  return deleteRecord('calendarEvent', id, '/dashboard/calendar')
}

// ── Gallery Images ──
export async function createGalleryImage(data) {
  await requireAuth()
  const record = await prisma.galleryImage.create({ data })
  revalidatePath('/dashboard/gallery')
  revalidatePath('/gallery')
  return record
}
export async function updateGalleryImage(id, data) {
  await requireAuth()
  const record = await prisma.galleryImage.update({ where: { id }, data })
  revalidatePath('/dashboard/gallery')
  revalidatePath('/gallery')
  return record
}
export async function deleteGalleryImage(id) {
  await requireAuth()
  await prisma.galleryImage.delete({ where: { id } })
  revalidatePath('/dashboard/gallery')
  revalidatePath('/gallery')
}

// ── Gallery Albums ──
export async function createGalleryAlbum(data) {
  await requireAuth()
  const { images, ...albumData } = data
  const album = await prisma.galleryAlbum.create({
    data: {
      ...albumData,
      images: images?.length > 0
        ? { create: images.map((url) => ({ title: albumData.title, imageUrl: url, category: albumData.category })) }
        : undefined,
    },
  })
  revalidatePath('/dashboard/gallery')
  revalidatePath('/gallery')
  return album
}

export async function updateGalleryAlbum(id, data) {
  await requireAuth()
  const { images, ...albumData } = data
  await prisma.galleryImage.deleteMany({ where: { albumId: id } })
  const album = await prisma.galleryAlbum.update({
    where: { id },
    data: {
      ...albumData,
      images: images?.length > 0
        ? { create: images.map((url) => ({ title: albumData.title, imageUrl: url, category: albumData.category })) }
        : undefined,
    },
  })
  revalidatePath('/dashboard/gallery')
  revalidatePath('/gallery')
  return album
}

export async function deleteGalleryAlbum(id) {
  await requireAuth()
  await prisma.galleryAlbum.delete({ where: { id } })
  revalidatePath('/dashboard/gallery')
  revalidatePath('/gallery')
}

// ── Admission Applications ──
export async function submitAdmissionApplication(data) {
  const application = await prisma.admissionApplication.create({ data })
  await prisma.notification.create({
    data: {
      type: 'admission',
      message: `New admission application from ${data.studentName} for ${data.classApplying}`,
      link: '/dashboard/admissions',
    },
  })
  revalidatePath('/dashboard/admissions')
  return application
}

export async function updateAdmissionStatus(id, status) {
  await requireAuth()
  const record = await prisma.admissionApplication.update({
    where: { id },
    data: { status },
  })
  revalidatePath('/dashboard/admissions')
  return record
}

export async function deleteAdmissionApplication(id) {
  await requireAuth()
  await prisma.admissionApplication.delete({ where: { id } })
  revalidatePath('/dashboard/admissions')
}

// ── Career Applications ──
export async function submitCareerApplication(data) {
  const { resumeBase64, ...rest } = data
  const application = await prisma.careerApplication.create({
    data: { ...rest, resumeUrl: resumeBase64 || null },
  })
  await prisma.notification.create({
    data: {
      type: 'career',
      message: `New career application from ${data.name}`,
      link: '/dashboard/career-applications',
    },
  })
  revalidatePath('/dashboard/career-applications')
  return application
}

export async function updateCareerApplicationStatus(id, status) {
  await requireAuth()
  const record = await prisma.careerApplication.update({
    where: { id },
    data: { status },
  })
  revalidatePath('/dashboard/career-applications')
  return record
}

export async function deleteCareerApplication(id) {
  await requireAuth()
  await prisma.careerApplication.delete({ where: { id } })
  revalidatePath('/dashboard/career-applications')
}

// ── Notifications ──
export async function markNotificationsRead() {
  await requireAuth()
  await prisma.notification.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  })
  revalidatePath('/dashboard')
}

// ── Site Settings ──
export async function updateSiteSetting(key, value) {
  await requireAuth()
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
  revalidatePath('/dashboard')
  revalidatePath('/admission')
}
