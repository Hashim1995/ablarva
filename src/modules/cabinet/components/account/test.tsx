/* eslint-disable no-plusplus */
import { daysList, yearsList } from '@/utils/constants/options';
import { Select, SelectItem } from '@nextui-org/react';

function BirthdateForm() {
  return (
    <div className="flex space-x-4">
      {/* Gün için Input */}
      <div className="flex-1">
        <Select size="sm" label="Gün" style={{ width: '100%' }}>
          {daysList?.map(day => (
            <SelectItem key={day.value} value={day.value}>
              {day.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {/* Ay için Select */}
      <div className="flex-1">
        <Select size="sm" label="Ay" style={{ width: '100%' }}>
          <SelectItem value="1" key={'1'}>
            Yanvar
          </SelectItem>
          <SelectItem value="2" key={'2'}>
            Fevral
          </SelectItem>
          <SelectItem value="3" key={'3'}>
            Mart
          </SelectItem>
          <SelectItem value="4" key={'4'}>
            Aprel
          </SelectItem>
          <SelectItem value="5" key={'5'}>
            May
          </SelectItem>
          <SelectItem value="6" key={'6'}>
            İyun
          </SelectItem>
          <SelectItem value="7" key={'7'}>
            İyul
          </SelectItem>
          <SelectItem value="8" key={'8'}>
            Avqust
          </SelectItem>
          <SelectItem value="9" key={'9'}>
            Sentyabr
          </SelectItem>
          <SelectItem value="10" key={'10'}>
            Oktyabr
          </SelectItem>
          <SelectItem value="11" key={'11'}>
            Noyabr
          </SelectItem>
          <SelectItem value="12" key={'12'}>
            Dekabr
          </SelectItem>
        </Select>
      </div>

      {/* Yıl için Input */}
      <div className="flex-1">
        <Select size="sm" label="İl" style={{ width: '100%' }}>
          {yearsList?.map(day => (
            <SelectItem key={day.value} value={day.value}>
              {day.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default BirthdateForm;
