import {
  LayoutAnimation,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import {
  Button,
  CheckBox,
  Divider,
  Drawer,
  DrawerGroup,
  DrawerItem,
  IndexPath,
  Input,
  Layout,
  List,
  ListItem,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import RowComponent from '../../components/row.component';
import TextComponent from '../../components/text.component';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import {Controller, useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Exercise {
  exercise_id: number;
  workout_plan_id: number;
  sets: number;
  reps: number;
  combination: number;
  id: number;
  exercise_name: string;
  workout_id: number;
  workout_reps: number;
  workout_max_weight: number;
}

interface WorkoutPlan {
  name: string;
  start_date: string;
  end_date: string;
  user_id: number;
  exercises_workout_plan: [
    {
      exercise_id: number;
      workout_plan_id: number;
      sets: number;
      reps: number;
      combination: any;
      id: number;
    },
  ];
  id: number;
}

interface ExerciseItem {
  exercise_id: number;
  workout_plan_id: number;
  sets: number;
  reps: number;
  combination: string | null;
  id: number;
  exercise_name: string;
  workout_id: number | null;
  workout_reps: number | null;
  workout_max_weight: number | null;
}

interface CustomSelectItem {
  name: string;
  id: number;
}

interface WorkoutFormData {
  max_weight: number;
  reps: number;
  workout_exercise_id: number;
  tab_index: number;
}

interface CustomJwtPayload {
  id: number;
}

const RegistrarTreino = ({navigation}: {navigation: any}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [token, setToken] = React.useState<null | string>();

  const getUserToken = async () => {
    try {
      let token = await AsyncStorage.getItem('access-token');
      setToken(token);
      console.log('Token obtido:', token);
      if (token == null) {
        navigation.navigate('Login');
      } else {
        const decoded = jwtDecode(token) as CustomJwtPayload;
        let userId = decoded.id;

        listExerciseWorkoutPlan(userId, token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const listExerciseWorkoutPlan = async (userId: number, userToken: string) => {
    try {
      console.log('Token antes da solicitação:', userToken);
      await axios
        .get('http://10.0.2.2:8000/workout-plan', {
          params: {
            user_id: userId,
            skip: 0,
            limit: 50,
          },
          headers: {Authorization: `Bearer ${userToken}`},
        })
        .then(response => {
          console.log(response.data);
          setListWorkoutPlan(response.data);
        });
    } catch (error) {
      console.log('Error selecting workout plans', error);
    }
  };

  const [listWorkoutPlan, setListWorkoutPlan] = useState<WorkoutPlan[]>([]);
  const [listExercises, setListExercises] = useState<Exercise[]>([]);

  React.useEffect(() => {
    getUserToken();
  }, []);

  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0),
  );

  const [checked, setChecked] = React.useState(false);

  const [inputFields, setInputFields] = useState<WorkoutFormData[]>([
    {
      max_weight: 0,
      reps: 0,
      workout_exercise_id: 0,
      tab_index: 0,
    },
  ]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<WorkoutFormData>({
    defaultValues: {
      max_weight: 0,
      reps: 0,
      workout_exercise_id: 0,
      tab_index: 0,
    },
  });

  const [selectedworkoutPlan, setselectedworkoutPlan] = useState<any>();
  const [selectedPlanId, setSelectedPlanId] = useState<number | undefined>(
    undefined,
  );

  const handleWorkoutPlanSelect = async (id: number) => {
    setSelectedPlanId(id);
    try {
      await axios
        .get('http://10.0.2.2:8000/exercise-workout-plan', {
          params: {
            workout_plan_id: id,
            skip: 0,
            limit: 25,
          },
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(response => {
          setListExercises(response.data);
        });
    } catch (error) {
      console.log('Error listing exercises', error);
    }
  };

  type AccordionItemPros = PropsWithChildren<{
    title: string;
  }>;

  function AccordionItem({children, title}: AccordionItemPros): JSX.Element {
    const [expanded, setExpanded] = useState(false);

    function toggleItem() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
      <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
          <Text style={styles.accordTitle}>{title}</Text>
          {expanded ? (
            <ChevronUpIcon color={'#fff'} />
          ) : (
            <ChevronDownIcon color={'#fff'} />
          )}
        </TouchableOpacity>
        {expanded && body}
      </View>
    );
  }

  const handleFormChange = (
    index: number,
    name: keyof WorkoutFormData,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    indexItem: number,
    workout_exercise_id: number,
  ) => {
    let data = [...inputFields];
    data[index][name] = parseInt(e.nativeEvent.text);
    data[index]['tab_index'] = indexItem;
    data[index]['workout_exercise_id'] = workout_exercise_id;
    setInputFields(data);
  };

  const addFields = (index: number, id: number) => {
    let newfield: WorkoutFormData = {
      max_weight: 0,
      reps: 0,
      workout_exercise_id: id,
      tab_index: index,
    };
    setInputFields([...inputFields, newfield]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Divider />
      <Layout style={{flex: 1, padding: 20}}>
        <Select
          label="Selecione o plano treino"
          placeholder="Selecione uma opção"
          style={{marginBottom: 20}}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          value={
            listWorkoutPlan.find(item => item.id === selectedPlanId)?.name
          }>
          {listWorkoutPlan.map((item, i) => (
            <SelectItem
              title={item.name}
              key={i}
              onPress={() => handleWorkoutPlanSelect(item.id)}
            />
          ))}
        </Select>

        <Text>{selectedworkoutPlan}</Text>

        <SafeAreaView style={styles.container}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.container}>
            {listExercises.map((item, indexItem) => (
              <AccordionItem title={item.exercise_name}>
                {inputFields.map((input, index) => {
                  if (input.tab_index == indexItem) {
                    return (
                      <Layout key={index}>
                        <RowComponent style={{flex: 1, alignItems: 'center'}}>
                          <Controller
                            control={control}
                            rules={{required: true}}
                            render={({field: {onChange, onBlur, value}}) => (
                              <Input
                                style={styles.input}
                                keyboardType="numeric"
                                onBlur={onBlur}
                                onChange={event =>
                                  handleFormChange(
                                    index,
                                    'reps',
                                    event,
                                    indexItem,
                                    item.id,
                                  )
                                }
                                value={inputFields[index].reps.toString()}
                              />
                            )}
                            name="reps"
                          />
                          <Text style={styles.text}>Reps</Text>

                          <Controller
                            control={control}
                            rules={{required: true}}
                            render={({
                              field: {name, onChange, onBlur, value},
                            }) => (
                              <Input
                                style={styles.input}
                                keyboardType="numeric"
                                onBlur={onBlur}
                                onChange={event =>
                                  handleFormChange(
                                    index,
                                    'max_weight',
                                    event,
                                    indexItem,
                                    item.id,
                                  )
                                }
                                value={inputFields[index].max_weight.toString()}
                              />
                            )}
                            name="max_weight"
                          />
                          <Text style={styles.text}>Kg</Text>
                        </RowComponent>
                      </Layout>
                    );
                  }
                })}
                <Button
                  status="info"
                  appearance="outline"
                  accessoryLeft={<PlusIcon color={'#0094fe'} />}
                  onPress={() => addFields(indexItem, item.id)}>
                  Nova série
                </Button>
              </AccordionItem>
            ))}
          </ScrollView>
        </SafeAreaView>

        <Button
          style={styles.drawerItemButton}
          size="tiny"
          appearance="outline"
          status="success"
          //   onPress={handleSubmit(onSubmit)}
        >
          <CheckIcon />
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default RegistrarTreino;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1, // Para ocupar o espaço horizontal disponível
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  text: {
    fontSize: 15,
  },
  drawerItemButton: {
    marginLeft: 10,
  },
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: '#1a2138',
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontSize: 15,
  },
  accordBody: {
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});
