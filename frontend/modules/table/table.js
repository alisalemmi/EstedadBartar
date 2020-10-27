export const render = (topRows, lastRow) => {
  let lastInTop = false;

  // header
  const header =
    '<li class="table__header"><span class="table__rank">رتبه</span><span class="table__name">نام</span><span class="table__score">امتیاز</span></li>';

  // body
  let body = '';
  for (const t of topRows) {
    body += `<li><span class="table__rank">${t.rank}</span><span class="table__name">${t.name}</span><span class="table__score">${t.score}</span></li>`;

    if (t.username === lastRow.username) lastInTop = true;
  }

  // last
  if (!lastInTop) {
    body += `<li><span class="table__rank">&vellip;</span><span class="table__name" style="margin-right: 4rem;">&vellip;</span><span class="table__score">&vellip;</span></li>
             <li><span class="table__rank">${lastRow.rank}</span><span class="table__name">${lastRow.name}</span><span class="table__score">${lastRow.score}</span></li>`;
  }

  return header + body;
};
