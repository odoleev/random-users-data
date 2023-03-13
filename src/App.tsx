import './App.css';
import React, {useEffect, useState} from "react";
// @ts-ignore
import {CSVLink} from 'react-csv';
import {useActions} from "./hooks/useActions";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {Button, Col, Row, Table} from "antd";
import {generateUsers} from "./utils/generateUsers";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {ELanguages} from "./Types";
import {generateRandomNumber} from "./utils/generateRandomNumber";
import {FunctionalTabs} from "./Components";

function App() {
  const { t } = useTranslation();
  const {setUsers, addUsers, cleanUsers} = useActions();
  const {users, lastNumber} = useTypedSelector(state => state.usersReducer);

  const [language, setLanguage] = useState<ELanguages>(ELanguages.EN);
  const [isReRender, setIsReRender] = useState<boolean>(true);
  const [isSeedChanged, setIsSeedChanged] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [mistakesValue, setMistakesValue] = useState<number>(0);
  const [mistakeRandomSeed, setMistakeRandomSeed] = useState<number>(Math.floor(generateRandomNumber()))

  const csvHeaders = [
    {
      label: t('tableTitles.number'),
      key: 'number',
    },
    {
      label: 'Id',
      key: 'id',
    },
    {
      label: t('tableTitles.name'),
      key: 'name',
    },
    {
      label: t('tableTitles.address'),
      key: 'address',
    },
    {
      label: t('tableTitles.phoneNumber'),
      key: 'phoneNumber',
    },
  ]

  const dataSource = users.map((user) => {
    return {
      key: user.id,
      ...user
    }
  });

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [])

  useEffect(() => {
    if(isReRender) {
        setUsers(generateUsers({
          seed: seed + page,
          firstRender: isReRender,
          lastNumber,
          mistakes: mistakesValue,
              mistakesSeed: mistakeRandomSeed,
              language},
            ));
        setIsReRender(false);

    } else if(isSeedChanged) {
        cleanUsers();
        setUsers(generateUsers({
          seed: seed + page,
          firstRender: isSeedChanged,
          lastNumber: 0,
          mistakes: mistakesValue,
          mistakesSeed: mistakeRandomSeed,
          language}));
        setIsSeedChanged(false);
      } else {
        addUsers(generateUsers({
          seed: seed + page,
          firstRender: isReRender,
          lastNumber,
          mistakes: mistakesValue,
          mistakesSeed: mistakeRandomSeed,
          language}))
      }
  }, [seed, page, mistakesValue, language])

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function handleScroll() {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
      setPage(prevState => prevState + 1);
    }
  }

  const onChangeMistake = (value: number | null) => {
    if (value !== null) {
      setMistakesValue(value);
      setPage(1);
      cleanUsers();
      setMistakeRandomSeed(generateRandomNumber());
      setIsReRender(true);
    }
  };

  const onChangeLanguage = (lang: ELanguages) => {
    setPage(1);
    cleanUsers();
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setIsReRender(true);
  }

  const onChangeSeed = (value: number | null) => {
    if(value !== null) {
      setSeed(value);
      setPage(1);
      setIsSeedChanged(true);
    }
  }

  const onRandomSeed = () => {
    cleanUsers();
    onChangeSeed(generateRandomNumber());
  }

  const columns = [
    {
      title: t('tableTitles.number'),
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('tableTitles.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('tableTitles.address'),
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: t('tableTitles.phoneNumber'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];

  return <div>
    <FunctionalTabs seed={seed}
                    mistakesValue={mistakesValue}
                    onChangeMistake={onChangeMistake}
                    onChangeLanguage={onChangeLanguage}
                    onChangeSeed={onChangeSeed}
                    onRandomSeed={onRandomSeed}
                    users={users}
                    language={language}/>
    <Table columns={columns} dataSource={dataSource} pagination={false}/>
    <div style={{width: "100%", height: "500px", display: "flex", alignContent: "center", justifyContent: "center"}}>
      <Row gutter={{ xs: 2, sm: 16, md: 24, lg: 32 }} align="middle">
        <Col >
          <span>{t('csv')}</span>
        </Col>
        <CSVLink data={users} headers={csvHeaders} filename='static_data.csv'>
          <Button type="primary">CSV</Button>
        </CSVLink>
      </Row>
    </div>

  </div>

}

export default App;
