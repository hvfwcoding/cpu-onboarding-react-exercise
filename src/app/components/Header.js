"use client";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import initTranslations from "../i18n";
import { NavItem, NavLink, NavList } from "../styles/Header";
import { StyledAppBar } from "../styles/StyledComponents";

const Header = ({ locale }) => {
  const [t, setT] = useState(() => (key) => key);

  useEffect(() => {
    if (!locale) {
      console.error("Locale is undefined, skipping translation fetch.");
      return;
    }

    const fetchTranslations = async () => {
      console.log("Fetching translations for locale (Header):", locale);
      const { t } = await initTranslations(locale, ["header"]);
      console.log("Translations fetched (Header):", t);
      setT(() => t);
    };

    console.log("Translated item text for item_1 in Header.");

    fetchTranslations();
  }, [locale]);

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <nav>
          <NavList>
            <NavItem>
              <Link href="/" passHref>
                <NavLink variant="body1">{t("item_1")}</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="#" passHref>
                <NavLink variant="body1">Onborading Exercise</NavLink>
              </Link>
            </NavItem>
          </NavList>
        </nav>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
