import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {DataTable, MD3DarkTheme} from 'react-native-paper';
import TableProps from '../interfaces/table.interface';
import {EyeIcon, TrashIcon} from 'react-native-heroicons/outline';
import {Layout} from '@ui-kitten/components';

const TableComponent = (props: TableProps) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );

  const [items] = React.useState(props.tableItems);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable style={{backgroundColor: '#33425c', marginTop: 20}}>
      <DataTable.Header>
        <DataTable.Title textStyle={styles.text}>Data</DataTable.Title>
        <DataTable.Title numeric textStyle={styles.text}>
          Peso
        </DataTable.Title>
        <DataTable.Title numeric textStyle={styles.text}>
          Gordura Corporal
        </DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map(item => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell textStyle={styles.text}>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric textStyle={styles.text}>
            {item.calories}
          </DataTable.Cell>
          <DataTable.Cell numeric textStyle={styles.text}>
            <Pressable>
              <EyeIcon color={'#fda900'} />
            </Pressable>

            <TrashIcon color={'red'} />
          </DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls={true}
        selectPageDropdownLabel={'Linhas por página'}
        theme={MD3DarkTheme}
      />
    </DataTable>
  );
};

export default TableComponent;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});
