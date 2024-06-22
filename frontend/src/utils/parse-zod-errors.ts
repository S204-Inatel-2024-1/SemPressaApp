type ZodErrors = {
  [key: string]: {
    message: string
  }
}

type LabelOfErrorName = {
  [key: string]: string
}

type ErrorMapped = { field: string; message: string }[]

export function parseZodErrors(
  errors: ZodErrors,
  errorMapping: LabelOfErrorName,
): ErrorMapped {
  const keys = Object.keys(errors)
  const errorsMapped: ErrorMapped = []

  for (const key of keys) {
    const errName = errorMapping[key]
    if (errName) {
      errorsMapped.push({
        field: errName,
        message: errors[key].message,
      })
    }
  }

  return errorsMapped
}
