// Repositório de Armazenamento Local (LocalStorage Repository) - Tactical Academy

class LocalStoreRepository {
  static KEYS = {
    DIARY: "tactical_diary",
    CHECKLISTS: "tactical_checklists",
    FAVORITES: "tactical_favorites",
    PROFILE: "tactical_profile",
    FLASHCARDS: "tactical_flashcards"
  };

  // --- DIÁRIO DE ESTUDOS ---
  static getDiary() {
    const data = localStorage.getItem(this.KEYS.DIARY);
    return data ? JSON.parse(data) : [];
  }

  static saveDiaryEntry(entry) {
    const diary = this.getDiary();
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("pt-BR"),
      timestamp: Date.now(),
      ...entry
    };
    diary.unshift(newEntry); // Adiciona no início (mais recente primeiro)
    localStorage.setItem(this.KEYS.DIARY, JSON.stringify(diary));
    
    // Incrementa horas no perfil
    this.addStudyHours(parseFloat(entry.duration || 0));
    return newEntry;
  }

  static deleteDiaryEntry(id) {
    const diary = this.getDiary();
    const filtered = diary.filter(entry => entry.id !== id);
    localStorage.setItem(this.KEYS.DIARY, JSON.stringify(filtered));
  }

  // --- CHECKLISTS ---
  static getChecklist(id) {
    const data = localStorage.getItem(this.KEYS.CHECKLISTS);
    const checklists = data ? JSON.parse(data) : {};
    return checklists[id] || null;
  }

  static saveChecklist(id, items) {
    const data = localStorage.getItem(this.KEYS.CHECKLISTS);
    const checklists = data ? JSON.parse(data) : {};
    checklists[id] = items;
    localStorage.setItem(this.KEYS.CHECKLISTS, JSON.stringify(checklists));
  }

  // --- FAVORITOS ---
  static getFavorites() {
    const data = localStorage.getItem(this.KEYS.FAVORITES);
    return data ? JSON.parse(data) : { modules: [], glossary: [], cases: [], library: [] };
  }

  static isFavorite(category, id) {
    const favs = this.getFavorites();
    if (!favs[category]) return false;
    return favs[category].includes(id);
  }

  static toggleFavorite(category, id) {
    const favs = this.getFavorites();
    if (!favs[category]) favs[category] = [];
    
    const index = favs[category].indexOf(id);
    if (index === -1) {
      favs[category].push(id);
    } else {
      favs[category].splice(index, 1);
    }
    
    localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favs));
    return index === -1; // Retorna true se adicionou, false se removeu
  }

  // --- PERFIL / PROGRESSO ---
  static getProfile() {
    const data = localStorage.getItem(this.KEYS.PROFILE);
    const defaultProfile = {
      level: 1,
      xp: 0,
      xpNextLevel: 100,
      totalHours: 0,
      streak: 0,
      lastActivityDate: null,
      badges: [] // Lista de badges conquistadas
    };
    
    if (!data) {
      return defaultProfile;
    }
    
    return JSON.parse(data);
  }

  static saveProfile(profile) {
    localStorage.setItem(this.KEYS.PROFILE, JSON.stringify(profile));
  }

  static addStudyHours(hours) {
    const profile = this.getProfile();
    profile.totalHours = parseFloat((profile.totalHours + hours).toFixed(1));
    
    // Verificar se ganhou alguma insígnia de horas
    this.checkTimeBadges(profile);
    
    this.saveProfile(profile);
  }

  static addXP(amount) {
    const profile = this.getProfile();
    profile.xp += amount;
    
    // Regra de subir de nível: Nível = 1 + floor(XP / 100)
    const newLevel = Math.floor(profile.xp / 100) + 1;
    if (newLevel > profile.level) {
      profile.level = newLevel;
      // Adiciona badge de nível
      const levelBadge = `Nível ${newLevel}`;
      if (!profile.badges.includes(levelBadge)) {
        profile.badges.push(levelBadge);
      }
    }
    
    this.saveProfile(profile);
    return profile;
  }

  static updateStreak() {
    const profile = this.getProfile();
    const todayStr = new Date().toLocaleDateString("pt-BR");
    
    if (profile.lastActivityDate === todayStr) {
      return profile.streak; // Já realizou atividade hoje, não altera streak
    }
    
    if (!profile.lastActivityDate) {
      profile.streak = 1;
    } else {
      // Comparar datas para ver se foi ontem
      const today = new Date();
      const lastDateParts = profile.lastActivityDate.split("/");
      const lastDate = new Date(lastDateParts[2], lastDateParts[1] - 1, lastDateParts[0]);
      
      const diffTime = Math.abs(today - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        profile.streak += 1;
      } else if (diffDays > 1) {
        profile.streak = 1; // Perdeu a sequência diária
      }
    }
    
    profile.lastActivityDate = todayStr;
    
    // Verificar badges de streak
    this.checkStreakBadges(profile);
    
    this.saveProfile(profile);
    return profile.streak;
  }

  static checkTimeBadges(profile) {
    const badges = profile.badges;
    if (profile.totalHours >= 1 && !badges.includes("Recruta")) {
      badges.push("Recruta"); // 1 hora de estudo
    }
    if (profile.totalHours >= 5 && !badges.includes("Operador")) {
      badges.push("Operador"); // 5 horas de estudo
    }
    if (profile.totalHours >= 20 && !badges.includes("Veterano")) {
      badges.push("Veterano"); // 20 horas de estudo
    }
  }

  static checkStreakBadges(profile) {
    const badges = profile.badges;
    if (profile.streak >= 3 && !badges.includes("Foco Consistente")) {
      badges.push("Foco Consistente"); // 3 dias de streak
    }
    if (profile.streak >= 7 && !badges.includes("Sentinela")) {
      badges.push("Sentinela"); // 7 dias de streak
    }
  }

  // --- FLASHCARDS (LEITNER BOX REPETIÇÃO ESPAÇADA) ---
  static getFlashcardBox(cardId) {
    const data = localStorage.getItem(this.KEYS.FLASHCARDS);
    const boxes = data ? JSON.parse(data) : {};
    return boxes[cardId] || 1; // Padrão: Caixa 1 (Rever diariamente)
  }

  static updateFlashcardBox(cardId, difficulty) {
    const data = localStorage.getItem(this.KEYS.FLASHCARDS);
    const boxes = data ? JSON.parse(data) : {};
    
    let currentBox = boxes[cardId] || 1;
    if (difficulty === "easy") {
      currentBox = Math.min(currentBox + 1, 5); // Avança até a caixa 5
    } else if (difficulty === "hard") {
      currentBox = 1; // Retorna para a caixa 1 (rever imediato)
    } else if (difficulty === "medium") {
      // Mantém na caixa ou avança com base em probabilidade (ou simplesmente não muda)
    }
    
    boxes[cardId] = currentBox;
    localStorage.setItem(this.KEYS.FLASHCARDS, JSON.stringify(boxes));
    return currentBox;
  }
}

export default LocalStoreRepository;
