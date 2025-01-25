import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetRole } from '@/api/hooks';
import styles from './AdminModerMain.module.scss';

interface TabContent {
  [key: string]: React.ReactNode;
}

interface IAdminModerMain {
  title: string;
  role: string;
  tabContents: TabContent;
  tabButtons: { label: string; value: string }[];
}

const AdminModerMain: React.FC<IAdminModerMain> = ({ title, role, tabContents, tabButtons }) => {
  const { data: roleData } = useGetRole(role);
  const location = useLocation();

  const activeTab =
    tabButtons.find((tab) => location.pathname.endsWith(tab.value))?.value.split('/')[0] ||
    tabButtons[0].value.split('/')[0];

  const renderContent = () => {
    return tabContents[activeTab] || null;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.titles}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{roleData?.description}</p>
        </div>

        <div className={styles.content}>
          <div className={styles.tabContainer}>
            {tabButtons.map((tab) => (
              <Link
                key={tab.value}
                to={`/${role.toLocaleLowerCase()}/${tab.value}`}
                className={`${styles.tabButton} ${activeTab === tab.value.split('/')[0] ? styles.active : ''}`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <div className={styles.tabContent}>{renderContent()}</div>
        </div>
      </div>
    </section>
  );
};

export default AdminModerMain;
