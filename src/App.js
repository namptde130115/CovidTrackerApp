//hooks
import { useEffect, useState } from 'react';
//components
import CountrySelector from './components/CountrySelector/index';
import HightLight from './components/HighLight/index';
import Summary from './components/Summary/index';

//api
import { getCountries, getReportByCountry } from './apis/index';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      console.log({ res });
      setCountries(res.data);

      // setSelectedCountryId('it');
    });
  }, []);

  const handleOnChange = (e) => {
    console.log(e.target.value);
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );

      //call api
      getReportByCountry(Slug).then((res) => {
        //xoa di item cuoi cung trong array res.data
        // res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryId]);

  return (
    <>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <HightLight report={report} />
      <Summary report={report} />
    </>
  );
}

export default App;
