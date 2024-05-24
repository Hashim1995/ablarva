/* eslint-disable react/jsx-no-bind */
import AppHandledBorderedButton from '@/components/forms/button/app-handled-bordered-button';
import AppHandledSolidButton from '@/components/forms/button/app-handled-solid-button';
import AppHandledInput from '@/components/forms/input/handled-input';
import AppHandledSelect from '@/components/forms/select/handled-select';
import { setState } from '@/models/common';
import { RootState } from '@/redux/store';
import {
  inputPlaceholderText,
  selectPlaceholderText
} from '@/utils/constants/texts';
import { inputValidationText } from '@/utils/constants/validations';
import { Button, Chip, Divider, ScrollShadow } from '@nextui-org/react';
import { t } from 'i18next';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import Editor, { BtnBold, EditorProvider, Toolbar } from 'react-simple-wysiwyg';
import useDarkMode from 'use-dark-mode';
import { ILeadItem, IQuickMail } from '../types';

interface IProps {
  setQuickMailDrawer: setState<boolean>;
  selectedLeads: ILeadItem[];
}

function QuickMail({ setQuickMailDrawer, selectedLeads }: IProps) {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IQuickMail>({
    mode: 'onChange'
  });

  function onSubmit() {
    console.log('a');
  }
  const [html, setHtml] = useState('my <b>HTML</b>');
  const [handledLeads, setHandledLeads] = useState(selectedLeads || []);
  const { senderInformationList } = useSelector(
    (state: RootState) => state?.ema
  );
  function onChange(e: any) {
    setHtml(e.target.value);

    console.log(html);
  }

  const darkMode = useDarkMode(false);

  const handleClose = (leadToRemove: ILeadItem) => {
    setHandledLeads(prev =>
      prev.filter((lead: ILeadItem) => lead !== leadToRemove)
    );
    if (handledLeads.length === 1) {
      setHandledLeads(selectedLeads);
    }
  };

  return (
    <main className="flex flex-col justify-between h-full overflow-y-auto remove-scrollbar">
      <header className="">
        <div className="flex justify-between items-center gap-1 p-5 drawer-header">
          <h1 className="flex-initial font-semibold text-default-800 text-large dark:text-white">
            Send quick email
          </h1>
          <Button
            size="sm"
            isIconOnly
            title="Close drawer"
            onClick={() => setQuickMailDrawer(false)}
            className="rounded-full"
            aria-label="Close drawer"
            type="button"
          >
            <IoCloseOutline className="text-default-900 dark:text-white" />
          </Button>
        </div>
        <Divider />
      </header>
      <section className="">
        <form
          className="h-full"
          id="quick-mail-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="items-center gap-2 p-5">
            <h3 className="mb-2">{t('to')}:</h3>
            <div className="border-1 border-divider p-3 rounded-2xl">
              <ScrollShadow
                hideScrollBar
                className="flex flex-wrap gap-2 max-h-28 overflow-y-auto max-h"
              >
                {handledLeads.map((lead: ILeadItem) => (
                  <Chip
                    key={lead?.id}
                    onClose={() => handleClose(lead)}
                    variant="bordered"
                    className="h-7"
                    size="sm"
                  >
                    {lead?.email}
                  </Chip>
                ))}
              </ScrollShadow>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="items-center gap-2 p-5 w-1/2">
              <h3 className="mb-2">{t('emailTitle')}: </h3>
              <AppHandledInput
                name="emailTitle"
                inputProps={{
                  id: 'emailTitle'
                }}
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('emailTitle'))
                  }
                }}
                control={control}
                isInvalid={Boolean(errors.emailTitle?.message)}
                errors={errors}
                size="sm"
                label={inputPlaceholderText(t('emailTitle'))}
              />
            </div>
            <div className="items-center gap-2 p-5 w-1/2">
              <h3 className="mb-2">{t('senderInformation')}: </h3>
              <AppHandledSelect
                name="senderInformation"
                rules={{
                  required: {
                    value: true,
                    message: inputValidationText(t('senderInformation'))
                  }
                }}
                isInvalid={Boolean(errors.senderInformation?.message)}
                selectProps={{
                  id: 'senderInformation'
                }}
                control={control}
                label={selectPlaceholderText(t('senderInformation'))}
                // className="app-select text-base sm:text-xl"
                options={senderInformationList?.data}
                errors={errors}
              />
            </div>
          </div>
          <div
            className={`items-center gap-2 p-5 ${
              errors.message?.message ? 'editor-has-error' : ''
            }  ${!darkMode.value ? 'light-theme-handler-editor' : ''} `}
          >
            <h3 className="mb-2">{t('message')}: </h3>
            {/* <Editor className="w-full" onChange={onChange} value={html} /> */}
            <Controller
              name={'message'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: inputValidationText(t('message'))
                }
              }}
              render={({ field: { ...props } }) => (
                <EditorProvider>
                  <Editor onChange={onChange} {...props}>
                    <Toolbar>
                      <BtnBold />
                    </Toolbar>
                  </Editor>
                  {errors.message?.message && (
                    <div
                      data-slot="helper-wrapper"
                      className="group-data-[has-helper=true]:flex relative flex-col gap-1.5 p-1"
                    >
                      <div
                        data-slot="error-message"
                        className="text-danger text-tiny"
                        id="react-aria736492713-:r58:"
                      >
                        {errors.message?.message}
                      </div>
                    </div>
                  )}
                </EditorProvider>
              )}
            />
          </div>
        </form>
        <Divider />
      </section>
      <footer className="flex justify-end items-center p-5 drawer-header">
        <div className="flex gap-3">
          <AppHandledBorderedButton
            title="draft save Email"
            aria-label="draft save Email"
          >
            {t('draft')}
          </AppHandledBorderedButton>
          <AppHandledSolidButton
            type="submit"
            form="quick-mail-form"
            title="send Email"
            aria-label="send Email"
          >
            {t('send')}
          </AppHandledSolidButton>
        </div>
      </footer>
    </main>
  );
}

export default QuickMail;
