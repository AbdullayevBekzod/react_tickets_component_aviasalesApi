import { useState, useEffect } from 'react';
import {Box, Text, Checkbox, CheckboxGroup, Stack, Grid, GridItem, Flex, Button} from '@chakra-ui/react';
import Ticket from './Ticket';
function App() {
  let navbgColor = '#2196F3';
  let navtxtColor = '#FFFFFF';

  // const [searchId, setSearchId] = useState();
  const [haveSearchId, setHaveSearchId] = useState(true);
  const [showMore, setShowMore] = useState(5);
  let [datas, setData] = useState([]);
  const [sortByPrice, setSortByPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

 
  useEffect(()=>{
     fetch('https://front-test.beta.aviasales.ru/search')
     .then(
       res => res.json()
     )
     .then(
        (res) => {
          setHaveSearchId(true);
          const searchId = res.searchId;
          console.log('search result: '+JSON.stringify(res));
          return fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`) 
              .then(
                res=>res.json()
              )
              .then(
                (res) => {
                  const datas = res.tickets;  
                  setData(datas);
                  setIsLoading(true);                  
                },
                (error)=>{
                  setError(error);
                  console.log('data error: '+ error.message);
                }) 
          },
        (error) => {
          setError(error);
          console.log('search error: ' + error);
        })
      }, [haveSearchId])
  
      function sortByFunc(type){
        const types = {
          price: "price",
          duration: "duration",
          change: "change"
      }
        alert('sorted')
        const sortProperty = types[type];
       const sorted = [...datas].sort((a, b)=>a[sortProperty]-b[sortProperty])
        setData(sorted);
      }
      if(error){
        return <div>Error: {error.message}</div>
      } else if(!isLoading){
        return <div>Loading ...</div>
      } else {
        return ( 
          <Box bg='gray.200' h='100vh' w='80%' mx='auto'>
            <Grid templateColumns='repeat(4, 1fr)' pt='10' templateRows='repeat(5, 1fr)' mx='auto' w='80%'>
              <GridItem colSpan={1} rowSpan={5} mr='5'>
                <Box w={64} borderWidth='1px' borderRadius='lg' bg='white' p={2} boxShadow='md'>
                  <Text fontSize='16' fontWeight='600'>Количество пересадок</Text>
                  <CheckboxGroup colorScheme='blue' bg='none'>
                    <Stack spacing={[5, 1]} direction={['row', 'column']}>
                      <Checkbox value='' fontSize='xs'>Все</Checkbox>
                      <Checkbox value=''>Без пересадок</Checkbox>
                      <Checkbox value=''>1 пересадка</Checkbox>
                      <Checkbox value=''>2 пересадка</Checkbox>
                      <Checkbox value=''>3 пересадка</Checkbox>
                      <Text></Text>
                    </Stack>
                  </CheckboxGroup>
                </Box>
              </GridItem>
              <GridItem colSpan={3} h='10' rowSpan={1} bg='white' borderRadius='lg' boxShadow='md' overflow='hidden'>
                <Flex borderWidth='2' w='100%' >
                  <Grid align='center'  templateColumns='repeat(3, 1fr)' w='100%'>
                    <GridItem h='12' color={navtxtColor} colSpan={1} bg={navbgColor}>
                      <Button bg="none" value="price" onClick={(e)=>sortByFunc(e.target.value)} >Самый дешевый</Button>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Button value="duration" onClick={(e)=>sortByFunc(e.target.value)}>Самый быстрый</Button>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Button value="change" onClick={(e)=>sortByFunc(e.target.value)}>Оптимальный</Button>
                    </GridItem>
                  </Grid>
                </Flex>   
              </GridItem>  
            </Grid>
         {datas.sort((a,b)=>a.price-b.price).slice(0, showMore).map(data=>{
             return( 
                  <Ticket {...data} key={datas.indexOf(data)} /> );         
             })}
            <Button type="submit" onClick={()=>{setShowMore(showMore+5)}}>Show More</Button>
          </Box>
        );
}
}

export default App;
