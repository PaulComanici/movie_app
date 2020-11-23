import React, { useContext, useEffect, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';
import { RouteComponentProps } from 'react-router';
import { Movie } from './Movies';

const log = getLogger('ItemEdit');

interface ItemEditProps extends RouteComponentProps<{
  id?: string;
}> {}

const ItemEdit: React.FC<ItemEditProps> = ({ history, match }) => {
  const { items, saving, savingError, saveItem } = useContext(ItemContext);
  const [nume, setNume] = useState('');
  const [regizor, setRegizor] = useState('');
  const [releasedate, setReleasedate] = useState('');
  const [released, setReleased] = useState('');
  const [item, setItem] = useState<Movie>();
  useEffect(() => {
    log('useEffect');
    const routeId = match.params.id || '';
    const item = items?.find(it => it._id === routeId);
    setItem(item);
    if (item) {
      setNume(item.nume);
      setRegizor(item.regizor);
      setReleased(item.released);
      setReleasedate(item.releasedate);
        }
  }, [match.params.id, items]);
  const handleSave = () => {
    const editedItem = item ? { ...item,nume,regizor,releasedate,released } : {nume,regizor,releasedate,released };
    saveItem && saveItem(editedItem).then(() => history.goBack());
  };
  log('render');
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
        <IonInput value={nume} onIonChange={e => setNume(e.detail.value || '')} />
        <IonLabel>Regizor</IonLabel>
        <IonInput value={regizor} onIonChange={e => setRegizor(e.detail.value || '')} />
        <IonLabel>Release Date</IonLabel>
        <IonInput value={releasedate} onIonChange={e => setReleasedate(e.detail.value || '')} />
        <IonLabel>Released</IonLabel>
        <IonInput value={released} onIonChange={e => setReleased(e.detail.value || '')} />
        <IonLoading isOpen={saving} />
        {savingError && (
          <div>{savingError.message || 'Failed to save item'}</div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ItemEdit;
