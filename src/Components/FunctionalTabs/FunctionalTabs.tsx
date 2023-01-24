import React from 'react';
// @ts-ignore
import {CSVLink} from 'react-csv';
import {Button, Col, InputNumber, Row, Slider} from "antd";
import {useTranslation} from "react-i18next";
import {IFunctionalTabs} from "./types";
import {languages} from "../../assets/languages";

export const FunctionalTabs = ({
        seed,
        onChangeSeed,
        onChangeMistake,
        onChangeLanguage,
        language, onRandomSeed,
        mistakesValue,
        users
}: IFunctionalTabs) => {
    const { t } = useTranslation();

    return (
        <Row align="middle" gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, {xs: 8, sm: 8 }]} style={{marginBottom: "20px"}}>
            <Col >
                <Row gutter={{ xs: 2, sm: 16, md: 24, lg: 32 }} align="middle">
                    <Col >
                        <span>Seed: </span>
                    </Col>
                    <Col >
                        <InputNumber min={0} defaultValue={seed} value={seed} onChange={onChangeSeed}/>
                    </Col>
                    <Col>
                        <Button onClick={onRandomSeed}>{t('random')} seed</Button>
                    </Col>
                </Row>
            </Col >

            <Col style={{marginRight: "50px"}}>
                <Row align="middle" gutter={{ xs: 2, sm: 16, md: 24, lg: 10 }}>
                    <Col >
                        <span style={{marginRight: '5px'}}>{t('mistakes')}:</span>
                    </Col>
                    <Col span={8}>
                        <Slider
                            min={0}
                            max={10}
                            onChange={onChangeMistake}
                            value={typeof mistakesValue === 'number' ? mistakesValue : 0}
                            step={0.25}
                        />
                    </Col>

                    <Col span={1}>
                        <InputNumber
                            min={0}
                            max={1000}
                            style={{ margin: '0 16px' }}
                            defaultValue={0}
                            step={0.25}
                            value={mistakesValue}
                            onChange={onChangeMistake}
                        />
                    </Col>
                </Row>


            </Col>
            <Col>
                <Row gutter={{ xs: 3, sm: 16, md: 24, lg: 32 }} align="middle">
                    {languages.map((lang) => (
                        <Col key={lang.code}>
                            <Button type={language === lang.code ? "primary" : "dashed"} onClick={() => onChangeLanguage(lang.code)}>{lang.name}</Button>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    );
};

