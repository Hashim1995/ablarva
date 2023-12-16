import './think-text.scss';

interface IThinkText {
  textList?: string[];
}

function ThinkText({
  textList = [
    'Qərara gəlməyə çalışıram 🧐',
    'Səbr edən dərviş muradına ərmiş 😔',
    'Tələsmə zaur, bu saat gəlirəm 💦',
    'İşləyirəm səbirli ol 🤔 ',
    'Tələsən təndirə düşər 😔',
    'Fikirləşirəm, bir saniyə 👨🏻‍💻'
  ]
}: IThinkText) {
  return (
    <div className="thinkText-frame">
      <div className="thinkText-center">
        <div className="thinkText-carousel">
          <div className="thinkText-pre">
            Hörmətli <strong>Aİ-ZADƏMİZ deyirki: </strong>{' '}
          </div>
          <div className="thinkText-change_outer">
            <div className="thinkText-change_inner">
              {textList?.map((item: string) => (
                <div key={item} className="thinkText-element">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThinkText;
