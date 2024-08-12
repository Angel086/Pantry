"use client"

import {Box,Stack, Typography,Button,Modal,TextField} from '@mui/material'
import { FirebaseAppProvider } from 'reactfire';
import { collection, query,doc, where,getDocs, getDoc,setDoc,deleteDoc} from 'firebase/firestore';
import { firestore } from '@/firbase';
import  { useEffect, useState} from'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantry,setPantry]=useState([]);
  const [itemName, setItemName]=useState('');

  const [open,setOpen] = useState(false);
  const handleOpen = ()=>setOpen(true);
  const handleClose = () => setOpen(false);
  
  const updatePantry = async () => {
        const snapshot = query(collection(firestore,'pantry'));
        const docs = await getDocs(snapshot);
        const pantryList = [];
        docs.forEach((doc) => {
          //console.log(doc.id, '=>', doc.data());
          // Add your data handling logic here. For now, just log it.
          pantryList.push({name: doc.id, ...doc.data()});
        })
        console.log(pantryList);
        setPantry(pantryList);
    }
 
  useEffect  (() => {
    
    updatePantry();
  }, []);

  const addItem = async (item) =>{
    const docRef =  doc(collection(firestore, 'pantry'),item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()){
      const {count} = docSnap.data();
      await setDoc(docRef, {count: count + 1});
      
      return 
    }else{
      await setDoc(docRef, {count: 1});
      
    }
    await updatePantry();
  }
  const removeItem = async (item)=>{
    const docRef = doc(collection(firestore,'pantry'),item);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      const {count} = docSnap.data();  // get current count of item from firestore.
      if(count==1){
        await deleteDoc(docRef);
      }else{
        await setDoc(docRef, {count: count - 1});
      }
    }
    await updatePantry();
  }
  return (
    
    <Box 
    width="100vw" 
    height="100vh" 
    display={"flex"} 
    justifyContent={"center"} 
    flexDirection={'column'}
    alignItems={"center"}
    gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
           Adding Item
          </Typography>
          <Stack width="100%"  direction={'row'} color={'#333'}>
            <TextField id="outlined-basic" 
            label="Item" 
            variant="outlined" 
            value={itemName}
            onChange={(e)=>setItemName(e.target.value)}
            />
            <Button variant="contained" color={'primary'}
            onClick={()=>{
              addItem(itemName);
              setItemName('');  // Clear the input field after adding the item.
              handleClose();
            }} >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>
        Add Items
      </Button>
      
      <Box width="800px" height="100px" bgcolor={'#ADD8E6'} display={'flex'} justifyContent={'center'} alignItems={'center'} border={'1px solid #333'}> 
        
        <Typography variant={'h3'}
          color={'#333'}
          textAlign={'center'}>Pantry Items </Typography>
          
        </Box>
      
      
      <Stack height="300px" width="800px" spacing={2} overflow={'auto'} border={'1px solid #333'} >
      
      {pantry.map(({name,count}) =>(
         
          <Box key={name} 
          width="100%" 
          minHeight="150px" 
          display={"flex"} 
          justifyContent={'space-between'}  
          paddingx={5}
          alignContent={'center'} 
          bgcolor={'#f0f0f0'} >
            <Typography
            variant={'h3'}
            color={'#333'}
            textAlign={'center'}
            >
              {name.charAt(0).toUpperCase()+name.slice(1)}
            </Typography>
            <Typography
            variant={'h3'}
            color={'#333'}
            textAlign={'center'}>
              Amount: {count}
            </Typography>
         
          <Button variant='contained' onClick={()=>removeItem(name)}>
            Remove
          </Button>
         </Box>
      ))}

     </Stack>
    </Box>
  );
}