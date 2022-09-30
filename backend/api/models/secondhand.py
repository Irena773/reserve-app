from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from api.db import Base

class SecondHand(Base):
    __tablename__ = "secondhands"

    id = Column(Integer, primary_key=True)
    reserve_time = Column(Integer)
    elapsed_time = Column(Integer)
    status = Column(String(1024))

    done = relationship("Done", back_populates="secondhand")


class Done(Base):
    __tablename__ = "dones"

    id = Column(Integer, ForeignKey("secondhands.id"), primary_key=True)
    secondhand = relationship("SecondHand", back_populates="done")