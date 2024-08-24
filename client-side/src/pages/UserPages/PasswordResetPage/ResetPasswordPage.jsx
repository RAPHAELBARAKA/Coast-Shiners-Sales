import PasswordReset from '../../../components/PasswordReset/PasswordReset';
import RegisterLogo from '../../../components/Register/RegisterLogo';
import "./PasswordResetPage.css"

const ResetPasswordPage = () => {
  return (
    <div className="resetpassword-page-container">
    <div className="resetpassword-logo-container">
      <RegisterLogo />
    </div>
    <div className="resetpassword-container">
      <PasswordReset/>
    </div>
  </div>
  );
}

export default ResetPasswordPage;
