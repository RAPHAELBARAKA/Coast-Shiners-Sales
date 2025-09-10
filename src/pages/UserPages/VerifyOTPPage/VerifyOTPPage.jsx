import RegisterLogo from "../../../components/Register/RegisterLogo"
import VerifyOTPForm from "../../../components/VerifyOTP/VerifyOTPForm"
import "./VerifyOTPPage.css"


const VerifyOTPpage = () => {
  return (
    <div className="verifyotp-page-container">
    <div className="verifyotp-logo-container">
      <RegisterLogo />
    </div>
    <div className="verifyotp-form-container">
      <VerifyOTPForm />
    </div>
  </div>
  )
}
export default VerifyOTPpage