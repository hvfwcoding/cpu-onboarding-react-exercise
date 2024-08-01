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
              <Link href="/get-request" passHref>
                <NavLink variant="body1">GET Request</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/post-request" passHref>
                <NavLink variant="body1">POST Request</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/put-request" passHref>
                <NavLink variant="body1">PUT Request</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/patch-request" passHref>
                <NavLink variant="body1">PATCH Request</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/delete-request" passHref>
                <NavLink variant="body1">DELETE Request</NavLink>
              </Link>
            </NavItem>
          </NavList>
        </nav>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
