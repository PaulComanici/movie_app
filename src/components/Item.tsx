import {Movie} from "./Movies";
import React from "react";
import {IonItem, IonLabel} from "@ionic/react";

interface MovieExt extends Movie {
    onEdit: (id?: string) => void;
}

const Item: React.FC<MovieExt> = ({id, nume, regizor, releasedate, released, onEdit}) => {
    return (
        <IonItem onClick={() => onEdit(id)}>
            <IonLabel>
                {nume}
            </IonLabel>
            <IonLabel>
                {regizor}
            </IonLabel>
            <IonLabel>
                {releasedate}
            </IonLabel>
            <IonLabel>
                {released}
            </IonLabel>
        </IonItem>
    );
};

export default Item;