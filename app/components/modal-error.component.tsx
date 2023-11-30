import {Button, Card, Modal} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {XMarkIcon} from 'react-native-heroicons/outline';
import TextComponent from './text.component';
import RowComponent from './row.component';

const ModalError = () => {
  const [alertVisible, setAlertVisible] = React.useState(false);

  return (
    <Modal
      visible={alertVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setAlertVisible(false)}
      style={styles.modal}>
      <Card disabled={true} style={styles.card}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <XMarkIcon size={65} color={'#fda900'} />
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
            Voltar
          </Button>
        </RowComponent>
      </Card>
    </Modal>
  );
};

export default ModalError;

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
