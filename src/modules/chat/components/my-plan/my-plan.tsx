/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { StatisticsUpdateData } from '@/models/common';
import { RootState } from '@/redux/store';
import { dictionary } from '@/utils/constants/dictionary';
import Empty from '@components/layout/empty';
import { Button, Card } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { RiPriceTag2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';

import {
  PieChart,
  Pie,
  Legend,
  ResponsiveContainer,
  Cell,
  Label
} from 'recharts';

function MyPlan() {
  const [chartData, setChartData] = useState<StatisticsUpdateData['data']>();

  const statisticsData: StatisticsUpdateData = useSelector(
    (state: RootState) => state.statisticsCount.statisticsCount
  );

  const chartData1 = [
    { name: 'Geri qalan', value: chartData?.basic.remainder },
    { name: 'İstifadə olunan', value: chartData?.basic?.usage }
  ];
  const chartData2 = [
    { name: 'Geri qalan', value: chartData?.premium?.remainder },
    { name: 'İstifadə olunan', value: chartData?.premium?.usage }
  ];

  const colorData1 = ['#319CFF', '#B3DAFF'];
  const colorData2 = ['#31FF90', '#B3FFD6'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: any) => {
    // Calculate the radius of the label position to be inside the chart segment
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent * 100 !== 0 ? (
      <text
        x={x}
        y={y}
        fill="#292D32"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '11px'
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  useEffect(() => {
    setChartData(statisticsData.data);
  }, [statisticsData]);

  return (
    <Card className="  shadow  h-full ">
      <div className="flex justify-between items-center mb-4 bg-black p-3">
        <h2 className="text-base sm:text-xl text-white font-semibold">
          {dictionary.az.my} {dictionary.az.tariff}
        </h2>
        <Button
          size="sm"
          isIconOnly
          className="bg-white rounded-full"
          aria-label="Filter"
        >
          <RiPriceTag2Fill size={20} color="#292D32" />
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow h-full px-6 componentsScrollBar overflow-y-scroll">
        {statisticsData.isSuccess ? (
          <div className="mb-3">
            <div className="text-black text-sm font-medium">
              {chartData?.packageName || ''}
            </div>
            <div className=" justify-center flex chartsHeight">
              <div className="sm:w-[14rem]  col-span-12 h-36 sm:col-span-6 md:col-span-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart className="mobile-row-chart">
                    <Pie
                      data={chartData1}
                      outerRadius={65}
                      innerRadius={28}
                      fill="#8884d8"
                      style={{
                        fontSize: '12px !important'
                      }}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Label
                        value={chartData?.basic?.total}
                        className="text-sm"
                        style={{
                          fill: '#292D32'
                        }}
                        position="center"
                      />
                      {chartData1.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorData1[index]} />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{
                        fontSize: '12px',
                        bottom: '-21px'
                      }}
                      iconSize={8}
                      verticalAlign="bottom"
                      height={1}
                      payload={chartData1.map((item, index) => ({
                        id: item.name,
                        type: 'square',
                        value: `${item.name} : ${item.value}`,
                        color: colorData1[index % colorData1.length]
                      }))}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="sm:w-[14rem]  col-span-12 h-36 sm:col-span-6 md:col-span-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart className="mobile-row-chart">
                    <Pie
                      data={chartData2}
                      labelLine={false}
                      outerRadius={65}
                      innerRadius={28}
                      style={{
                        fontSize: '12px !important'
                      }}
                      label={renderCustomizedLabel}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Label
                        style={{
                          fill: '#292D32'
                        }}
                        value={chartData?.premium?.total}
                        className="text-sm"
                        position="center"
                      />
                      {chartData2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorData2[index]} />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{
                        fontSize: '12px',
                        bottom: '-21px'
                      }}
                      iconSize={8}
                      verticalAlign="bottom"
                      height={1}
                      payload={chartData2.map((item, index) => ({
                        id: item.name,
                        type: 'square',
                        value: `${item.name} : ${item.value}`,
                        color: colorData2[index % colorData2.length]
                      }))}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <Empty text="Sizin mövcud paketiniz yoxdur" />
        )}
      </div>
    </Card>
  );
}

export default MyPlan;
