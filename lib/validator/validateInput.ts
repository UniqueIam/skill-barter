import { ZodSchema } from "zod";
import { NextRequest, NextResponse } from "next/server";

function formDataToObject(formData: FormData) {
  const obj: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

export function withValidation<T>(
  schema: ZodSchema<T>,
  handler: (req: NextRequest, data: T) => Promise<NextResponse>
) {
  return async function (req: NextRequest) {
    try {
      let body;

      if (req.headers.get("Content-Type")?.includes("multipart/form-data")) {
        const formData = await req.formData();
        body = formDataToObject(formData);
      } else {
        body = await req.json();
      }

      const parsed = schema.safeParse(body);

      if (!parsed.success) {
        return NextResponse.json(
          { errors: parsed.error.errors },
          { status: 400 }
        );
      }

      return handler(req, parsed.data);
    } catch (err) {
      console.error("Validation middleware error:", err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  };
}
