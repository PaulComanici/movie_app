import { Movie } from "./Movies";
import React from "react";
import { IonItem, IonLabel, IonText } from "@ionic/react";
import { release } from "os";

interface MovieExt extends Movie {
    onEdit: (id?: string) => void;
}

const Item: React.FC<MovieExt> = ({ _id, nume, regizor, releasedate, released, onEdit }) => {
    return (
        <IonItem onClick={() => onEdit(_id)}>
            <IonLabel className="ion-text-wrap">
                <p>Nume</p>
                <IonText>{nume}</IonText>
                <p>Regizor</p>
                <IonText>{regizor}</IonText>
            </IonLabel>
        </IonItem>
    );
};

export default Item;