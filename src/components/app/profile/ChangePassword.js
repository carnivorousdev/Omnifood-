import FalconCardHeader from 'components/common/FalconCardHeader';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { firestoreAuth } from 'config'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { toast } from 'react-toastify';
import AppContext from 'context/Context';

const ChangePassword = () => {
  const {
    createdRecipesLoading,
    loading
  } = useContext(AppContext);

  const promptForCredentials = () => {
    const email = window.prompt('Enter your email:');
    const password = window.prompt('Enter your password:');

    if (!email || !password) {
      throw new Error('Invalid email or password');
    }
    const credential = EmailAuthProvider.credential(email, password);
    return credential;
  }

  const onSubmit = () => {
    if (createdRecipesLoading || loading) {
      return
    } else {
      try {
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
              })
              .catch((error) => {
                toast.error(`${error.message}`, {
                  theme: 'colored'
                });
              });
          })
          .catch((error) => {
            toast.error(`${error.message}`, {
              theme: 'colored'
            });
          });
      } catch (error) {
        toast.error(`${error.message}`, {
          theme: 'colored'
        });
      }
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
        {createdRecipesLoading || loading ? '' : <Button className="w-100" onClick={() => onSubmit()}>
          Update
        </Button>}
      </Card.Body>
    </Card>
  );
};

export default ChangePassword;
