export const ADDRESS_ID = "ADDRESS_ID";
export const GET_ADDRESS = "GET_ADDRESS";

export const AddressId = (payload) => {
  return {
    type: ADDRESS_ID,
    payload
  };
};

export const GetAddress= (payload)=>{
  return {
    type:GET_ADDRESS,
    payload
  }
}