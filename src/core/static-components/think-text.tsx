import './think-text.scss';

interface IThinkText {
  textList?: string[];
}

function ThinkText({
  textList = [
    'Qərara gəlməyə çalışıram 🧐',
    'Səbr edən dərviş muradına ərmiş 😌',
    'İşləyirəm səbirli ol 🛠️',
    'Tələsən təndirə düşər ⏳',
    'Fikirləşirəm, bir saniyə 🤔',
    'Zəhmət çəkən zövq alar 💪',
    'İt ürəyər, karvan keçər 🐶🚶‍♂️',
    'Nə əkmisən, onu biçərsən 🌱➡️🌾',
    'Cavabınızı hazırlayıram 💡',
    'Sizin sualınıza uyğun ən yaxşı cavabı düşünürəm 🎯',
    'Sizin üçün məlumat axtarıram 🔍',
    'Sorğunuzu dəyərləndirirəm, biraz gözləyin ⌛',
    'Zəhmət olmasa gözləyin, cavabınız yoldadır 📬',
    'Sorğunuz üzərində işləyirəm 🖥️',
    'Biraz daha vaxt lazımdır, mürəkkəb məsələdir 🧩',
    'Sizə ən yaxşı cavabı vermək üçün məlumat toplayıram 📚',
    'Sualınızı dəqiqləşdirirəm, tezliklə cavab verəcəyəm 🔍',
    'Cavabınız üçün lazımi məlumatları yoxluyuram 📖',
    'Biraz səbir, tezliklə sizinləyəm ⏰',
    'Məlumat bazamda axtarış aparıram 🌐',
    'Sizin sorğunuz üçün ən uyğun məlumatı seçirəm ✅',
    'Sizin məsələnizlə maraqlanıram, biraz vaxt verin 🤝',
    'Dəqiq cavab vermək üçün təhlil edirəm 🔬',
    'Mürəkkəb sorğu, dərindən araşdırıram 🕵️‍♂️',
    'Sizin sualınıza ən uyğun cavabı tapmaq üzərəyəm 🔎',
    'Həll yolu axtarırıq, tezliklə cavablandıracağam 🛤️',
    'Yaxşı dost qıymətli bir xəzinədir 💎',
    'Vaxt qızıldan dəyərlidir ⌛'
  ]
}: IThinkText) {
  return (
    <div className="thinkText-frame pl-6">
      <div className="thinkText-center">
        <div className="thinkText-carousel">
          <div className="thinkText-pre lg:text-base text-white sm:text-sm text-xs">
            <span className="sm:inline hidden">Hörmətli</span>{' '}
            <strong>Aİ-ZADƏ deyirki: </strong>{' '}
          </div>
          <div className="thinkText-change_outer">
            <div className="thinkText-change_inner text-white">
              {textList
                ?.map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
                ?.map((item: string) => (
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
