import {RouteComponentProps} from "react-router";
import {Movie} from "./Movies";
import React, {useContext, useEffect, useState} from "react";
import {ItemContext} from "./ItemProvider";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel
} from '@ionic/react';

interface ItemEditProps extends RouteComponentProps< {
    id?: string
}>{}

const ItemEdit: React.FC<ItemEditProps> = ({history, match}) => {
    const {items, saving, savingError, saveItem} = useContext(ItemContext)
    const [nume, setNume] = useState('');
    const [regizor, setRegizor] = useState('');
    const [releasedate, setReleasedate] = useState('');
    const [released, setReleased] = useState('');
    const [item, setItems] = useState<Movie>();

    useEffect(() => {
       const routeId = match.params.id || '';
       const item = items?.find(it => it.id === routeId);
       setItems(item);
       if (item){
           setNume(item.nume);
           setRegizor(item.regizor);
           setReleasedate(item.releasedate);
           setReleased(item.released);
       }
    }, [match.params.id, items]);

    const handleSave = () => {
        const editedItem = item ? { ...item, nume, regizor, releasedate, released } : { nume, regizor, releasedate, released}
        saveItem && saveItem(editedItem).then(() => history.goBack());
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleSave}>
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLabel>Nume</IonLabel>
                <IonInput value={nume} onIonChange={e => setNume(e.detail.value || '')}/>
                <IonLabel>Regizor</IonLabel>
                <IonInput value={regizor} onIonChange={e => setRegizor(e.detail.value || '')}/>
                <IonLabel>Release Date</IonLabel>
                <IonInput value={releasedate} onIonChange={e => setReleasedate(e.detail.value || '')}/>
                <IonLabel>released</IonLabel>
                <IonInput value={released} onIonChange={e => setReleased(e.detail.value || '')}/>
                <IonLoading isOpen={saving} />
                {savingError && (
                    <div>{savingError.message || 'Failed to save item'}</div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ItemEdit