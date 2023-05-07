import { useEffect, useContext } from 'react';
import { Timestamp, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { OmnifoodServer } from 'config';
import { toast } from 'react-toastify';
import { useState } from 'react';
import _ from 'lodash';
import AppContext from 'context/Context';

const BookMarkCheck = (lookUpdata) => {
    const [bookMarkLoading, setBookMarkLoading] = useState(false)
    const [checkHeartColor, setHeartColor] = useState(false)
    const [bookMarksLength, setBookMarksLength] = useState([])
    const { handleBookMarksData, userInfo } = useContext(AppContext);

    useEffect(() => {
        if (lookUpdata && Object.keys(userInfo).length > 0) {
            getDocument()
        } else if (Object.keys(userInfo).length > 0) {
            getDocument()
        } else return
    }, [lookUpdata, userInfo])

    const getDocument = async () => {
        const documentRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data')
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
            setBookMarksLength(Object.values(docSnap.data()))
            handleBookMarksData(Object.values(docSnap.data()))
            if (lookUpdata) {
                var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
                if (result) {
                    setHeartColor(true)
                } else {
                    setHeartColor(false)
                }
            } else return
        } else {
            handleBookMarksData([])
            setHeartColor(false)
        }
    }

    const addToBookMark = async (data) => {
        const documentRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data')
        data['dateModified'] = Timestamp.now()
        const docSnap = await getDoc(documentRef);
        if (docSnap.exists()) {
            await updateDoc(documentRef, {
                [data.idMeal]: data
            }, { capital: true }, { merge: true });
            toast.success(`Added to Bookmarks`, {
                theme: 'colored'
            });
            setBookMarkLoading(false)
            setHeartColor(true)
        } else {
            await setDoc(documentRef, {
                [data.idMeal]: data
            }, { capital: true }, { merge: true });
            toast.success(`Added to Bookmarks`, {
                theme: 'colored'
            });
            setBookMarkLoading(false)
            setHeartColor(true)
        }
        getDocument()
    }

    const removeFromBookMark = async (data) => {
        const documentRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data')
        await updateDoc(documentRef, {
            [data.idMeal]: deleteField()
        });
        toast.warn(`Removed from Bookmarks`, {
            theme: 'colored'
        });
        setBookMarkLoading(false)
        setHeartColor(false)
        getDocument()
    }

    const checkAddToBookMark = async (lookUpdata) => {
        const docRef = doc(OmnifoodServer, userInfo.uid, 'Bookmarks-Data');
        const docSnap = await getDoc(docRef);
        var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
        if (docSnap.exists()) {
            var result = _.findKey(docSnap.data(), { 'idMeal': lookUpdata.idMeal });
            if (result) {
                removeFromBookMark(lookUpdata)
            } else {
                addToBookMark(lookUpdata)
            }
        } else {
            addToBookMark(lookUpdata)
        }
    }
    return {
        bookMarkLoading,
        checkHeartColor,
        checkAddToBookMark,
        setBookMarkLoading,
        bookMarksLength,
    }
};

export default BookMarkCheck;
