import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/ui/LegalPage";
import { LEGAL, req, LEGAL_PAGES } from "@/lib/legal";
import { SITE, OFFICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Реквизиты и правовая информация",
  alternates: { canonical: "/rekvizity/" },
  description:
    "Полное наименование, ИНН, ОГРН, юридический адрес, сведения о членстве в СРО и контакты проектной организации «Раздел Проект».",
};

export default function Page() {
  return (
    <LegalPage
      title="Реквизиты и правовая информация"
      intro="Сведения об исполнителе, раскрываемые в соответствии со статьёй 9 Закона РФ «О защите прав потребителей»."
    >
      <h2>Сведения об организации</h2>
      <dl>
        <dt>Полное наименование</dt>
        <dd>{req(LEGAL.fullName)}</dd>
        <dt>Сокращённое наименование</dt>
        <dd>{LEGAL.shortName}</dd>
        <dt>ИНН</dt>
        <dd>{req(LEGAL.inn)}</dd>
        <dt>КПП</dt>
        <dd>{req(LEGAL.kpp)}</dd>
        <dt>ОГРН</dt>
        <dd>{req(LEGAL.ogrn)}</dd>
        <dt>Юридический адрес</dt>
        <dd>{req(LEGAL.legalAddress)}</dd>
        <dt>Почтовый адрес</dt>
        <dd>{req(LEGAL.postAddress)}</dd>
        <dt>Руководитель</dt>
        <dd>{req(LEGAL.director)}</dd>
      </dl>

      <h2>Допуски и разрешения</h2>
      <p>
        Проектные и изыскательские работы выполняются на основании членства в саморегулируемой
        организации в соответствии с главой 6.1 Градостроительного кодекса Российской Федерации.
      </p>
      <dl>
        <dt>Саморегулируемая организация</dt>
        <dd>{req(LEGAL.sro.name)}</dd>
        <dt>Регистрационный номер члена СРО</dt>
        <dd>{req(LEGAL.sro.number)}</dd>
        <dt>Дата регистрации в реестре</dt>
        <dd>{req(LEGAL.sro.date)}</dd>
      </dl>
      <p>
        Работы по сохранению объектов культурного наследия выполняются на основании лицензии
        Министерства культуры Российской Федерации в соответствии с Федеральным законом
        от 25.06.2002 № 73-ФЗ.
      </p>
      <dl>
        <dt>Лицензия Минкультуры России</dt>
        <dd>{req(LEGAL.licenseOkn.number)}</dd>
        <dt>Дата выдачи</dt>
        <dd>{req(LEGAL.licenseOkn.date)}</dd>
      </dl>

      <h2>Контакты</h2>
      <dl>
        <dt>Телефон</dt>
        <dd>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </dd>
        <dt>Электронная почта</dt>
        <dd>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </dd>
        <dt>Режим работы</dt>
        <dd>{SITE.hours}</dd>
        <dt>Офисы</dt>
        <dd>{OFFICES.map((o) => o.city).join(", ")}</dd>
      </dl>

      <h2>Обработка персональных данных</h2>
      <dl>
        <dt>Ответственный за организацию обработки</dt>
        <dd>{req(LEGAL.pdResponsible)}</dd>
        <dt>Адрес для обращений субъектов персональных данных</dt>
        <dd>
          <a href={`mailto:${LEGAL.pdEmail}`}>{LEGAL.pdEmail}</a>
        </dd>
        <dt>Номер в реестре операторов персональных данных</dt>
        <dd>{req(LEGAL.rknNumber)}</dd>
      </dl>

      <h2>Правовые документы</h2>
      <ul>
        {LEGAL_PAGES.filter((p) => p.href !== "/rekvizity/").map((p) => (
          <li key={p.href}>
            <Link href={p.href}>{p.title}</Link>
          </li>
        ))}
      </ul>

      <div className="note">
        Информация на сайте не является публичной офертой. Стоимость и сроки работ определяются
        договором после рассмотрения исходных данных по объекту — подробнее в{" "}
        <Link href="/polzovatelskoe-soglashenie/">Пользовательском соглашении</Link>.
      </div>
    </LegalPage>
  );
}
