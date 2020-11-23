import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import {
    IonButton,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonList, IonLoading,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Item from './Item';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';
import { AuthContext } from '../auth/AuthProvider';
import { Movie } from './Movies';
import { getItems } from './movieAPI';

const log = getLogger('ItemList');

const ItemList: React.FC<RouteComponentProps> = ({ history }) => {
    const { token } = useContext(AuthContext);
    const [page, setPage] = useState<number>(2);
    const { items, fetching, fetchingError } = useContext(ItemContext);
    const [filteredItems, setFilteredItems] = useState<Movie[]>([]);
    const { logout } = useContext(AuthContext);
    const [searchText, setSearchText] = useState<string>("");
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
    log('render');

    useEffect(() => setFilteredItems([...(items ? items : [])]), [items]);

    async function fetchData(reset?: boolean) {
        const res = await getItems(token, page);
        setFilteredItems([...filteredItems, ...res]);
        setDisableInfiniteScroll(res.length < 5);
        setPage(page + 1);
    };

    async function searchNext($event: CustomEvent<void>) {
        console.log("wac");
        await fetchData();
        ($event.target as HTMLIonInfiniteScrollElement).complete();
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Movie List</IonTitle>
                    <IonButton onClick={logout}>Logout</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading isOpen={fetching} message="Fetching items" />
                <IonSearchbar onIonChange={(event) => setSearchText(event.detail.value ? event.detail.value : "")}></IonSearchbar>
                {filteredItems && (
                    <IonList>
                        {filteredItems.filter(i => i.nume.toLowerCase().includes(searchText)).map(({ _id, nume, regizor, releasedate, released }) =>
                            <Item key={_id} _id={_id} nume={nume} regizor={regizor} released={released} releasedate={releasedate} onEdit={id => history.push(`/item/${id}`)} />)}
                    </IonList>
                )}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/item')}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                <IonInfiniteScroll disabled={disableInfiniteScroll} threshold="10px"
                    onIonInfinite={(e: CustomEvent<void>) => searchNext(e)}>
                    <IonInfiniteScrollContent
                        loadingText="Loading more good doggos...">
                    </IonInfiniteScrollContent>
                </IonInfiniteScroll>
                {fetchingError && (
                    <div>{fetchingError.message || 'Failed to fetch items'}</div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default ItemList;
