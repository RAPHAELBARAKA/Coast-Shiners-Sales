import React from 'react'
import VerifypassOtp from '../../../components/VerifypassOtp/VerifypassOtp'
import RegisterLogo from '../../../components/Register/RegisterLogo'

function VerifypassOtpPage() {
  return (
    <div className="verifyotp-page-container">
    <div className="verifyotp-logo-container">
      <RegisterLogo/>
    </div>
    <div className="verifyotp-form-container">
      <VerifypassOtp />
    </div>
  </div>
  )
}

export default VerifypassOtpPage
