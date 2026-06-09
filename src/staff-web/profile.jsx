/* Web Staff Portal — profile (split from staff-web.jsx) */

/* ---------- PROFILE ---------- */
function ProfilePage({ lang }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow={lang === "en" ? "Personal · Cluster A" : "ສ່ວນຕົວ · ກຸ່ມ A"}
        title={lang === "en" ? "My Profile" : "ຂໍ້ມູນສ່ວນຕົວ"}
        sub={lang === "en" ? "Personal data, addresses, contacts, banking, emergency, ID documents." : "ຂໍ້ມູນສ່ວນຕົວ, ທີ່ຢູ່, ຜູ້ຕິດຕໍ່, ທະນາຄານ, ສຸກເສີນ, ເອກະສານຢັ້ງຢືນ."}
        right={<button className="btn primary"><I n="edit" s={14} /> {lang === "en" ? "Request change" : "ຂໍແກ້ໄຂ"}</button>}
      />

      <div className="grid-2">
        {/* Left: identity card */}
        <div className="card">
          <div className="profile-head">
            <div className="profile-av">{ME.avatar}</div>
            <div>
              <div className="profile-nm">{lang === "en" ? ME.nameEn : ME.nameLo}</div>
              <div className="profile-rl">{lang === "en" ? ME.title : ME.titleLo}</div>
              <div className="profile-id">
                <span className="mono">{ME.id}</span>
                <span className="sep" />
                <span>{lang === "en" ? ME.division : ME.divisionLo}</span>
              </div>
            </div>
          </div>

          <div className="dl">
            <div className="dl-grp">
              <div className="dl-h">{lang === "en" ? "Personal" : "ສ່ວນຕົວ"}</div>
              <div className="dl-r"><span>{lang === "en" ? "Full name (EN)" : "ຊື່ເຕັມ (EN)"}</span><span>{ME.nameEn}</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Full name (LO)" : "ຊື່ເຕັມ (LO)"}</span><span className="lao">{ME.nameLo}</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Date of birth" : "ວັນເດືອນປີເກີດ"}</span><span>14 Mar 1985</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Nationality" : "ສັນຊາດ"}</span><span>Lao PDR</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Gender" : "ເພດ"}</span><span>Male</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Marital" : "ສະຖານະຄອບຄົວ"}</span><span>Married · 2 children</span></div>
            </div>

            <div className="dl-grp">
              <div className="dl-h">{lang === "en" ? "Contact" : "ຕິດຕໍ່"}</div>
              <div className="dl-r"><span>{lang === "en" ? "Email" : "ອີເມວ"}</span><span>{ME.email}</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Mobile" : "ມືຖື"}</span><span className="mono">{ME.phone}</span></div>
              <div className="dl-r"><span>WhatsApp / LINE</span><span>+856 20 5544 0127</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Address" : "ທີ່ຢູ່"}</span><span>Ban Nongbouathong, Kaysone Phomvihane, Savannakhet</span></div>
            </div>

            <div className="dl-grp">
              <div className="dl-h">{lang === "en" ? "Emergency" : "ສຸກເສີນ"}</div>
              <div className="dl-r"><span>{lang === "en" ? "Contact" : "ຜູ້ຕິດຕໍ່"}</span><span>Vilayphone Phommachanh (spouse)</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Phone" : "ໂທ"}</span><span className="mono">+856 20 9990 1188</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Blood type" : "ກຸ່ມເລືອດ"}</span><span>O+</span></div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="grid-stack">
          <div className="card">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Employment" : "ການຈ້າງງານ"}</div>
            </div>
            <div className="dl">
              <div className="dl-r"><span>{lang === "en" ? "Employee ID" : "ID ພະນັກງານ"}</span><span className="mono">{ME.id}</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Joined" : "ເຂົ້າວຽກ"}</span><span>{ME.joined}</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Employment type" : "ປະເພດການຈ້າງ"}</span><span>Permanent · Full-time</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Manager" : "ຫົວໜ້າ"}</span><span>{ME.manager}</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Cost center" : "ສູນຄ່າໃຊ້ຈ່າຍ"}</span><span className="mono">CC-SVK-PROD-A</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Work location" : "ສະຖານທີ່"}</span><span>Savannakhet Plant</span></div>
            </div>
          </div>

          <div className="card">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Banking & statutory" : "ທະນາຄານ & ກົດໝາຍ"}</div>
            </div>
            <div className="dl">
              <div className="dl-r"><span>{lang === "en" ? "Salary bank" : "ທະນາຄານ"}</span><span>{ME.bank}</span></div>
              <div className="dl-r"><span>NSSF</span><span className="mono">{ME.nssf}</span></div>
              <div className="dl-r"><span>{lang === "en" ? "PIT (TIN)" : "ພາສີ (TIN)"}</span><span className="mono">{ME.pit.replace("TIN ", "")}</span></div>
              <div className="dl-r"><span>{lang === "en" ? "Provident Fund" : "ກອງທຶນສຳຮອງ"}</span><span>5% employer · 5% employee</span></div>
            </div>
          </div>

          <div className="card">
            <div className="card-h">
              <div className="card-t">{lang === "en" ? "Documents on file" : "ເອກະສານ"}</div>
              <a className="card-act">{lang === "en" ? "Manage" : "ຈັດການ"}</a>
            </div>
            <ul className="doc-l">
              {[
                { t: "National ID", lo: "ບັດປະຈຳຕົວ", st: "Verified" },
                { t: "Family book", lo: "ປຶ້ມສຳມະໂນຄົວ", st: "Verified" },
                { t: "Education certificate", lo: "ໃບປະກາສະນີຍະບັດ", st: "Verified" },
                { t: "Driving license", lo: "ໃບຂັບຂີ່", st: "Expires Feb 2026" },
              ].map((d, i) => (
                <li key={i}>
                  <I n="file" s={14} c="#8B8E99" />
                  <div>
                    <div>{d.t}</div>
                    <div className="lao muted small">{d.lo}</div>
                  </div>
                  <span className="muted small">{d.st}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
