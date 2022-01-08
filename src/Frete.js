import React, { useState, useEffect } from 'react'
import axios from 'axios' // npm install axios
import ProgressBar from 'react-percent-bar'; // npm install react-percent-bar


function Frete() {
  
  //setando valores 0 para os estados
  const [frete, setFrete] = useState(0);
  const [valorFrete, setValorFrete]= useState(0);
  //consumo da api com aiox
  useEffect(() => { 
    axios.get(`https://open.er-api.com/v6/latest/USD`)
    .then(res => {
      //retornando valor da api dinamicamente
      let valueCart = res.data.rates.AFN; 

      //tratando valores
      let parcentVal = ((valueCart * 100) / 150)
      let valorFreteSub = (150 - valueCart).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      
      //setando valores tratados aos estados criados la em cima
      setValorFrete(valorFreteSub)
      setFrete(parcentVal)
      
    })
  }); 
 
  return (
    <div class="frete__container"> 
      
      {frete < 100 && ( 
        <> 
          <span className="frete__title">Faltam apenas {valorFrete} para ganhar frete grátis</span>
          <ProgressBar colorShift={true} fillColor="orange" percent={frete} />
        </> 
      )}

      {frete >= 100 && ( 
        <> 
          <span className="frete__title">Parabéns 🎉🎉 Você ganhou frete grátis!</span>
          <ProgressBar colorShift={true} fillColor="orange" percent={100} />
        </> 
      )}

    </div>
  );
};

export default Frete;
