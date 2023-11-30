import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  Modal,
  Button,
  Card,
  Input,
  Layout,
  Divider,
} from '@ui-kitten/components';
import DefaultScreenComponent from '../../components/default-screen.component';
import NotFoundComponent from '../../components/not-found.component';
import {
  BellAlertIcon,
  CheckIcon,
  ExclamationCircleIcon,
  PlusIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
import TextComponent from '../../components/text.component';
import RowComponent from '../../components/row.component';
import TableProps from '../../interfaces/table.interface';
import {DataTable, MD3DarkTheme} from 'react-native-paper';
import {EyeIcon, TrashIcon} from 'react-native-heroicons/outline';

const AvaliacaoFisica = () => {
  const [visible, setVisible] = React.useState(false);
  const [alertVisible, setAlertVisible] = React.useState(false);

  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [tableItems] = React.useState([
    {
      key: 1,
      name: '28/09/2023',
      calories: 56,
      fat: 16,
    },
    {
      key: 2,
      name: '28/09/2023',
      calories: 22,
      fat: 16,
    },
    {
      key: 3,
      name: '28/09/2023',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: '28/09/2023',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, tableItems.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DefaultScreenComponent>
      <Layout style={{flex: 1}}>
        <Button
          appearance="outline"
          status="warning"
          accessoryLeft={<PlusIcon color={'#fda900'} />}
          onPress={() => setVisible(true)}>
          Nova avaliação
        </Button>

        <DataTable style={{backgroundColor: '#33425c', marginTop: 20}}>
          <DataTable.Header>
            <DataTable.Title textStyle={styles.text}>Data</DataTable.Title>
            <DataTable.Title numeric textStyle={styles.text}>
              Peso
            </DataTable.Title>
            <DataTable.Title numeric textStyle={styles.text}>
              Ações
            </DataTable.Title>
          </DataTable.Header>

          {tableItems.slice(from, to).map(item => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell textStyle={styles.text}>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell numeric textStyle={styles.text}>
                {item.calories}
              </DataTable.Cell>
              <Pressable
                onPress={() => setVisible(true)}
                style={{
                  padding: 10,
                  marginStart: 20,
                }}>
                <EyeIcon color={'#fda900'} />
              </Pressable>
              <Pressable
                onPress={() => setAlertVisible(true)}
                style={{
                  padding: 10,
                }}>
                <TrashIcon color={'red'} />
              </Pressable>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(tableItems.length / itemsPerPage)}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${tableItems.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls={true}
            selectPageDropdownLabel={'Linhas por página'}
            theme={MD3DarkTheme}
          />
        </DataTable>

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
          style={styles.modal}>
          <Card disabled={true} style={styles.card}>
            <RowComponent style={{justifyContent: 'space-between'}}>
              <TextComponent style={{fontSize: 20}}>
                Inserir avaliação
              </TextComponent>
              <TouchableHighlight onPress={() => setVisible(false)}>
                <XMarkIcon color={'#fff'} />
              </TouchableHighlight>
            </RowComponent>

            <Divider style={{marginBottom: 20}} />

            <View style={{flex: 1}}>
              <ScrollView style={{maxHeight: 400}}>
                <Input
                  label="Peso"
                  keyboardType="numeric"
                  placeholder="Peso em kg"
                  style={styles.input}
                />

                <Input
                  label="Percentual de gordura"
                  keyboardType="numeric"
                  placeholder="% de gordura corporal"
                  style={styles.input}
                />

                <Input
                  label="Tórax"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Braço direito contraído"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Braço esquerdo contraído"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Quadril"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Braço direito relaxado"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Braço esquerdo relaxado"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Abdômem"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Cintura"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Antebraço direito"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Antebraço esquerdo"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Coxa direita"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />

                <Input
                  label="Coxa esquerda"
                  keyboardType="numeric"
                  placeholder="Medida em cm"
                  style={styles.input}
                />
              </ScrollView>
            </View>
            <RowComponent style={{marginTop: 20, justifyContent: 'center'}}>
              <Button
                status="basic"
                appearance="outline"
                onPress={() => setVisible(false)}
                style={{marginRight: 10}}
                accessoryLeft={<XMarkIcon color={'#8f9bb3'} />}>
                Fechar
              </Button>
              <Button
                status="success"
                appearance="outline"
                accessoryLeft={<CheckIcon color={'#00e096'} />}>
                Salvar
              </Button>
            </RowComponent>
          </Card>
        </Modal>

        <Modal
          visible={alertVisible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setAlertVisible(false)}
          style={styles.modal}>
          <Card disabled={true} style={styles.card}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <ExclamationCircleIcon size={65} color={'#fda900'} />
              <TextComponent style={{fontSize: 30, marginVertical: 20}}>
                Você tem certeza?
              </TextComponent>

              <TextComponent>Você não poderá reverter essa ação.</TextComponent>
            </View>
            <RowComponent style={{marginTop: 30, justifyContent: 'center'}}>
              <Button
                status="basic"
                appearance="outline"
                onPress={() => setAlertVisible(false)}
                style={{marginRight: 10}}
                accessoryLeft={<XMarkIcon color={'#8f9bb3'} />}>
                Cancelar
              </Button>
              <Button
                status="danger"
                appearance="outline"
                accessoryLeft={<CheckIcon color={'#ff3d71'} />}>
                Sim, deletar
              </Button>
            </RowComponent>
          </Card>
        </Modal>
      </Layout>
      <NotFoundComponent>Nenhuma avaliação física registrada</NotFoundComponent>
    </DefaultScreenComponent>
  );
};

export default AvaliacaoFisica;

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
  },
  card: {
    padding: 8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    marginBottom: 20,
  },
  text: {
    color: '#fff',
  },
});
