import FalconCardHeader from 'components/common/FalconCardHeader';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { firestoreAuth } from 'config'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { toast } from 'react-toastify';
import AppContext from 'context/Context';
import { ProfileContext } from 'context/ProfileProvider';

const ChangePassword = () => {
  const {
    handleLoading,
    handleCreatedRecipesLoading
  } = useContext(AppContext);
  const { profileLoading, handleProfileLoading } = useContext(ProfileContext)

  const promptForCredentials = () => {
    const email = window.prompt('Enter your email:');

    if (!email) {
      throw new Error('Provide email for reauthentication');
    } else {
      const password = window.prompt('Enter your password:');
      if (!password) {
        throw new Error('Provide password for reauthentication');
      }
      const credential = EmailAuthProvider.credential(email, password);
      return credential;
    }
  }
  const onSubmit = () => {
    try {
      handleProfileLoading(true)
      handleLoading(true)
      handleCreatedRecipesLoading(true)
      const credential = promptForCredentials();
      const user = firestoreAuth.currentUser;
      reauthenticateWithCredential(user, credential)
        .then(() => {
          const newPassword = prompt('Enter your new password:');
          updatePassword(user, newPassword)
            .then(() => {
              toast.success(`Password updated successfully`, {
                theme: 'colored'
              });
              handleProfileLoading(false)
              handleLoading(false)
              handleCreatedRecipesLoading(false)
            })
            .catch((error) => {
              toast.error(`${error.message}`, {
                theme: 'colored'
              });
              handleProfileLoading(false)
              handleLoading(false)
              handleCreatedRecipesLoading(false)
            });
        })
        .catch((error) => {
          toast.error(`${error.message}`, {
            theme: 'colored'
          });
          handleProfileLoading(false)
          handleLoading(false)
          handleCreatedRecipesLoading(false)
        });
    } catch (error) {
      toast.error(`${error.message}`, {
        theme: 'colored'
      });
      handleProfileLoading(false)
      handleLoading(false)
      handleCreatedRecipesLoading(false)
    }
  };

  return (
    <Card className="mb-3">
      <FalconCardHeader title="Update Password" />
      <Card.Body className="bg-light">
        <h5 className="mb-2">Secure Your Account</h5>
        <p className="fs--2">
          Updating your password helps prevent unauthorized access and keeps your information safe. Choose a strong password for added security.
        </p>
        <Button className="w-100" onClick={() => onSubmit()} disabled={profileLoading}>
          Update
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ChangePassword;
