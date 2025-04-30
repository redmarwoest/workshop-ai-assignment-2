import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export default async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const teamName = formData.get('teamName') as string;

    if (!file || !teamName) {
      return NextResponse.json({ error: 'File and team name are required' }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(`teams/${teamName}-${Date.now()}`, file, {
      access: 'public',
    });

    // Store in database
    await sql`
      INSERT INTO teams (name, image_url)
      VALUES (${teamName}, ${blob.url})
    `;

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}
