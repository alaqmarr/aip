import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { NextResponse } from "next/server"

// Ensure environment variables are set before trying to initialize if not in dev
const accountId = process.env.R2_ACCOUNT_ID || 'mock_account_id'

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || 'mock_key',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || 'mock_secret',
  },
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || 'mock_bucket',
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    )

    const publicUrl = process.env.R2_PUBLIC_URL || 'http://localhost:3000'
    const fileUrl = `${publicUrl}/${fileName}`

    return NextResponse.json({ url: fileUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
