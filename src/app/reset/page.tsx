"use client"

import UpdatePassword from "../../components/UpdatePassword"
type Props = {}

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const passwordResetToken = searchParams?.id

  return (
    <div>
      {/*       {passwordResetToken} */}
      <UpdatePassword resetToken={passwordResetToken} />
    </div>
  )
}
