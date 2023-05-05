import FalconCardHeader from 'components/common/FalconCardHeader';
import AppContext from 'context/Context';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteUser, signOut } from "firebase/auth"
import { firestoreAuth } from 'config'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DangerZone = () => {
  const navigate = useNavigate()
  const {
    createdRecipesLoading,
    loading,
    setConfig,
    handleUserInfo
  } = useContext(AppContext);

  const deleteAccount = async () => {
    const confirmation = window.confirm('Are you sure you want to delete your account? This action is irreversible and all your data will be permanently deleted.');
    if (confirmation) {
      try {
        deleteUser(firestoreAuth.currentUser).then(() => {
          signOut(firestoreAuth).then(() => {
            toast.success(`Account deleted successfully`, {
              theme: 'colored'
            });
            navigate('/login')
            setConfig('isDark', false)
            handleUserInfo({})
          }).catch((error) => {
            toast.error(`${error.message}`, {
              theme: 'colored'
            });
          });
        }).catch((error) => {
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
  }
  return (
    <Card>
      <FalconCardHeader title="Danger Zone" />
      <Card.Body className="bg-light">
        <h5 className="mb-2">Delete this account</h5>
        <p className="fs--2">
          If you no longer need your account, deleting it is a simple way to protect your personal data and privacy. All the data you have created will be permanently deleted, so you can be sure that your information is not being used or stored by the platform.
        </p>
        {createdRecipesLoading || loading ? '' : <Button variant="falcon-danger" className="w-100"
          onClick={() => deleteAccount()}>
          Deactivate Account
        </Button>}
      </Card.Body>
    </Card>
  );
};

export default DangerZone;
