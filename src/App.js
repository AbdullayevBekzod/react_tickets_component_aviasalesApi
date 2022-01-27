import { useState, useEffect } from 'react';
import {Box, Text, Checkbox, CheckboxGroup, Stack, Grid, GridItem, Flex, Button} from '@chakra-ui/react';
// import Ticket from './Ticket';
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
  
      function sortByPriceFunc(){
        alert('sorted')
      }
      // useEffect(()=>{
      //   datas = datas.map(str=>{
      //         if(datas[datas.indexOf(str)].price > datas[datas.indexOf(str)+1].price ){
      //           [datas[datas.indexOf(str)].price, datas[datas.indexOf(str)+1].price] = [datas[datas.indexOf(str)+1].price, datas[datas.indexOf(str)].price]
      //         }
      // })}, [sortByPrice]) 
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
                      <Button bg="none" onClick={sortByPriceFunc} >Самый дешевый</Button>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text>Самый быстрый</Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Text>Оптимальный</Text>
                    </GridItem>
                  </Grid>
                </Flex>   
              </GridItem>  
            </Grid>
         {datas.sort((a,b)=>a.price-b.price).slice(0, showMore).map(data=>{
             return( 
                  // <NewTicket data={data} id={datas.indexOf(data)} key={datas.indexOf(data)} /> );
              <Box key={datas.indexOf(data)} colSpan={3} mt='5' borderWidth='2' borderRadius="lg" w='55%' align='left' float='right' mr='100px' boxShadow='md' bg='white' rowSpan={3}>
                <Grid templateRows='repeat(3, 1fr)' mx="auto">
                    <GridItem rowSpan={1}>
                      <Text fontSize='22px' ml="30px" mt="20px" align='left'>{data.price}</Text>
                      <Text fontSize='22px' mr="30px" mb="20px" align='right'>Avialines</Text>
                    </GridItem>
                    <GridItem rowSpan={2}>
                      <Grid templateColumns='repeat(3, 1fr)'>
                        <GridItem colSpan={1} ml="30px">
                          <Text>{data.segments[0].origin} - {data.segments[0].destination}</Text>
                          <Flex fontWeight='700'>
                            <Text>{data.segments[0].date.slice(11, 16)}</Text>&nbsp;-&nbsp; <Text>{parseInt((((data.segments[0].date.slice(11, 19).split(":")[0]*60+data.segments[0].date.slice(11, 19).split(":")[1]*1) + data.segments[0].duration)/60)%24)}:{((data.segments[0].date.slice(11, 19).split(":")[0]*60+data.segments[0].date.slice(11, 19).split(":")[1]*1) + data.segments[0].duration)%60}</Text>  
                          </Flex>
                          {/* <Box fontSize="xx-small">
                            <Text>{data.segments[0].date}</Text>   
                            <Text>Duration : {parseFloat(data.segments[0].duration)}</Text>   
                          </Box> */}
                          
                          <Text mt="10px">{data.segments[1].origin} - {data.segments[1].destination}</Text>
                          <Flex fontWeight='700'>
                            <Text>
                              {data.segments[1].date.slice(11, 16)}
                            </Text>
                            &nbsp;-&nbsp; 
                            <Text>
                              { parseInt((((data.segments[1].date.slice(11, 19).split(":")[0]*60+data.segments[1].date.slice(11, 19).split(":")[1]*1) + data.segments[1].duration)/60)%24)}:{((data.segments[1].date.slice(11, 19).split(":")[0]*60+data.segments[1].date.slice(11, 19).split(":")[1]*1) + data.segments[1].duration)%60}
                            </Text>  
                          </Flex>
                          {/* <Box fontSize="xx-small">
                            <Text>{data.segments[1].date}</Text>   
                            <Text>Duration : {parseFloat(data.segments[1].duration)}</Text>   
                          </Box> */}
                        </GridItem>
                        <GridItem colSpan={1} ml="30px">
                          <Text>В ПУТИ</Text>
                          <Text fontWeight="700">{parseInt(data.segments[0].duration/60)}ч&nbsp;{data.segments[0].duration%60}м</Text>
                          <Text  mt="10px">В ПУТИ</Text>
                          <Text fontWeight="700">{parseInt(data.segments[1].duration/60)}ч&nbsp;{data.segments[1].duration%60}м</Text>
                        </GridItem>
                        <GridItem colSpan={1} ml="30px">
                          <Text>{data.segments[0].stops.length} ПЕРЕСАДОК</Text>
                          <Flex fontWeight="700">
                            {data.segments[0].stops.map(stop=>{
                              return <Text key={data.segments[0].stops.indexOf(stop)}>{stop}&nbsp;</Text>
                            })}
                          </Flex>
                          <Text  mt="10px">{data.segments[1].stops.length} ПЕРЕСАДОК</Text>
                          <Flex fontWeight="700">
                            {data.segments[1].stops.map(stop => {
                              return <Text key={data.segments[1].stops.indexOf(stop)}>{stop}&nbsp;</Text>
                            })}
                          </Flex>
                        </GridItem>
                      </Grid>
                    </GridItem>
                  </Grid>
                </Box>
             )})}
            <Button type="submit" onClick={()=>{setShowMore(showMore+5)}}>Show More</Button>
          </Box>
        );
}
}

export default App;
