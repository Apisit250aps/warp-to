import { warps } from '@/models'
import { Warp, warpSchema } from '@/models/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse<Warp>>> {
  try {
    const body = await req.json()

    const validate = warpSchema.safeParse(body)

    if (!validate.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid warp data',
          error: validate.error.flatten(),
        },
        { status: 400 }
      )
    }

    const unique = await warps.findOne({ content: validate.data.content })

    if (unique) {
      return NextResponse.json(
        {
          success: false,
          message: 'Warp with the same content already exists',
        },
        { status: 409 }
      )
    }

    await warps.insertOne(validate.data)

    return NextResponse.json(
      {
        success: true,
        message: 'Warp created successfully',
        data: validate.data,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create warp',
        error,
      },
      { status: 500 }
    )
  }
}

export async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextRequest
): Promise<NextResponse<ApiResponse<Warp[]>>> {
  try {
    const data = await warps.find({}).project({ _id: 0 }).toArray()

    return NextResponse.json(
      {
        success: true,
        message: 'Warps retrieved successfully',
        data: data as Warp[],
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to retrieve warps',
        error,
      },
      { status: 500 }
    )
  }
}
