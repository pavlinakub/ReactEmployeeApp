import styled from "styled-components";

export const PageContainer = styled.div`
  //zde muzeme psat styly
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #9593bf;
  color: white;
  padding-top: 50px;
`;

export const EmploeesList = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  background: transparent;
  border-radius: 5px;
`;
export const EmplyeeItem = styled.div`
  display: flex;
  height: 45px;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background-color: #2d2c59;
  &:nth-child(even) {
    background-color: #725ef2;
  }
`;
export const EmplyeeForm = styled(EmploeesList)`
  //prestylovani DogList
  flex-direction: row;
  margin: 50px 0;
  padding-top: 0;
  justify-content: space-between;
  align-items: center;
`;
export const Input = styled.input`
  width: 130px;
  height: 25px;
  padding-left: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
export const Button = styled.button`
  width: 130px;
  height: 25px;
  border-radius: 5px;
`;
export const Buttons = styled(EmplyeeForm)`
  margin: 30px;
  height: 40px;
  border-radius: 5px;
`;

export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48%;
  border: 1px solid white;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  font-weight: bolder;
  cursor: pointer;
  background-color: #101026;
  /* zmena pri splneni podminky */
  ${(props) => {
    if (props.name === props["data-active"]) {
      return `
  background-color:rgba(255,255,255,0.3);
  color:#371BF2
   
  
  `;
    }
  }}
`;
export const WorkForm = styled(EmplyeeForm)`
  flex-direction: column;
`;
export const AddButton = styled.button`
  padding: 10px 10px;
  font-weight: bolder;
  border-radius: 5px;
  margin-top: 20px;
`;
export const P = styled.div`
  background-color: #2d2c59;
  padding: 15px 15px;
  border-radius: 5px;
  font-size: 1.3rem;
  text-align: center;
`;
export const H3 = styled.h3`
  margin-bottom: 20px;
  font-size: 1.5rem;
`;
